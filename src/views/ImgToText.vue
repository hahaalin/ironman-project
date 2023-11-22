<template>
  <div class="container">
    <h1>圖片轉文字</h1>
    <hr class="my-6" />
    <div class="flex items-center">
      <label for="">辨識語言:</label>
      <select
        v-model="selectedLang"
        class="block p-2.5 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      >
        <option v-for="lang in langs" :key="lang.name" :value="lang.name">
          {{ `${lang.name} (${lang.lang})` }}
        </option>
      </select>
    </div>
    <div class="my-6">
      <label for="">選擇圖片:</label>
      <input type="file" @change="uploadImage" accept="image/*" />
    </div>
    <div class="flex">
      <div v-if="imageData" class="border w-1/2">
        <img :src="imageData" alt="圖像" />
      </div>
      <button
        v-if="imageData"
        @click="processImage"
        class="border p-2 bg-violet-400 text-white"
      >
        辨識
      </button>
      <div class="border w-1/2" v-if="recognizedText">
        <div v-if="loading">正在處理中...</div>
        <div v-else>
          <div>{{ recognizedText }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createWorker } from 'tesseract.js';

const loading = ref(false);
const selectedLang = ref('chi_tra');
const imageData = ref(null);
const recognizedText = ref(null);
const langs = [
  {
    name: 'chi_tra',
    lang: '繁體中文'
  },
  {
    name: 'eng',
    lang: '英文'
  },
  {
    name: 'chi_sim',
    lang: '簡體中文'
  }
];
let worker = null;

const uploadImage = async event => {
  imageData.value = null;
  recognizedText.value = null;
  const file = event.target.files[0];
  if (!file) return;
  const imageURL = URL.createObjectURL(file);
  imageData.value = imageURL;
};
const processImage = async () => {
  loading.value = true;

  try {
    worker = await createWorker(selectedLang.value, 1, {
      logger: m => console.log(m)
    });
    const {
      data: { text }
    } = await worker.recognize(imageData.value);

    recognizedText.value = text;
  } catch (error) {
    console.error('Error processing image:', error);
  } finally {
    loading.value = false;
    if (worker) {
      await worker.terminate();
    }
  }
};
</script>

<style lang="scss" scoped></style>
