<template>
  <div>
    <p>上傳圖片</p>
    <div
      class="flex items-center justify-between w-full p-6 text-gray-900 border border-gray-300 rounded-lg bg-gray-100"
    >
      <input
        type="file"
        ref="fileInput"
        class="block text-sm focus:outline-none"
        id="file"
        accept="image/*"
        @change="handleFileSelect"
      />
      <button
        type="button"
        @click="upload"
        class="border p-2 bg-violet-400 text-white"
      >
        上傳
      </button>
    </div>

    <div
      class="min-h-[300px] border-2 border-dashed p-2 mt-5 border-violet-400 flex justify-center items-center"
    >
      <div v-if="uploadProgress !== null">
        <progress :value="uploadProgress" max="100">
          {{ uploadProgress }}%
        </progress>
        {{ uploadProgress }}%
      </div>
      <p v-if="downloadURL">
        <img :src="downloadURL" alt="Uploaded Image" class="max-h-[300px]" />
      </p>
      <p v-else class="ml-2">圖片顯示於此</p>
    </div>
  </div>

  <div class="flex flex-wrap justify-center mt-4 max-h-[500px] overflow-auto">
    <p class="w-full">照片清單</p>
    <p v-if="loading">Loadig...</p>
    <div
      v-else
      v-for="item in downloadURLs"
      class="w-[25%] border relative p-2"
    >
      <img
        :src="item.url"
        alt=""
        :key="item.url"
        class="object-cover w-full h-full"
      />

      <button
        type="button"
        class="absolute cursor-pointer right-3 top-0.5"
        @click="removeImg(item.fullPath)"
      >
        <img src="/src/assets/icon/remove.png" width="32" height="32" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { storage } from '@/services/firebase.js';
import {
  ref as storageRef,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject
} from 'firebase/storage';
import { onMounted, ref, nextTick } from 'vue';

const selectedFile = ref();
const fileInput = ref(null);
const downloadURL = ref();
const uploadProgress = ref(null);
const loading = ref(false);
const downloadURLs = ref([]);

const handleFileSelect = event => {
  const file = event.target.files[0];

  if (file && file.size <= 2 * 1024 * 1024) {
    selectedFile.value = file;
    downloadURL.value = '';
  } else {
    alert('文件大小超過2MB，請重新上傳');
    fileInput.value.value = '';
    selectedFile.value = '';
  }
};

const upload = () => {
  if (!selectedFile.value) {
    return;
  }

  const storageName = storageRef(storage, `images/${selectedFile.value.name}`);

  const uploadTask = uploadBytesResumable(storageName, selectedFile.value);

  uploadTask.on(
    'state_changed',
    snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      console.log('Upload state ', snapshot.state);
      uploadProgress.value = parseInt(progress);
    },
    error => {
      console.log('Upload error', error);
    },
    async () => {
      downloadURL.value = await getDownloadURL(uploadTask.snapshot.ref);
      console.log('File available at', downloadURL.value);
      uploadProgress.value = null;
      fileInput.value.value = '';
      selectedFile.value = '';
      getImgListAll();
    }
  );
};

const getImgListAll = async () => {
  loading.value = true;
  await nextTick();
  downloadURLs.value = [];
  const listRef = storageRef(storage, 'images');

  try {
    const res = await listAll(listRef);
    const urls = await Promise.all(
      res.items.map(async itemRef => ({
        url: await getDownloadURL(itemRef),
        fullPath: itemRef.fullPath
      }))
    );
    downloadURLs.value = urls;
  } catch (error) {
    console.error('Error getting download URLs', error);
  } finally {
    loading.value = false;
  }
};

const removeImg = async fullPath => {
  try {
    await deleteObject(storageRef(storage, fullPath));
    await getImgListAll();
  } catch (error) {
    console.error('Error deleting image', error);
  }
};
onMounted(() => {
  getImgListAll();
});
</script>

<style lang="scss" scoped></style>
