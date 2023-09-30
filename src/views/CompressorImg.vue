<template>
  <div class="container">
    <h1>圖片壓縮</h1>
    <p></p>
    <hr class="my-6" />
    <div>
      <input
        type="file"
        class="block w-full p-6 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 first-line:focus:outline-none"
        id="file"
        accept="image/*"
        @change="handleImageUpload"
      />
    </div>

    <div
      v-if="originalSize && compressedImage"
      class="flex flex-wrap justify-center my-6"
    >
      <div class="w-5/12 p-4 border border-gray-300">
        <h2>原始圖像大小：{{ originalSize }}</h2>
        <h2>原始的圖像：</h2>
        <div>
          <img :src="originalImage" alt="原始的圖像" class="max-w-full" />
        </div>
      </div>
      <div class="w-2/12 flex items-center justify-center">
        <p class="text-white text-xl font-bold bg-gray-300 p-2 rounded-3xl">
          >
        </p>
      </div>

      <div class="w-5/12 p-4 border border-gray-300">
        <h2>壓縮後的圖像大小：{{ compressedSize }}</h2>
        <h2>壓縮後的圖像：</h2>
        <div>
          <img :src="compressedImage" alt="壓縮後的圖像" class="max-w-full" />
        </div>
        <a
          :href="compressedImage"
          download="compressed_image.jpg"
          class="block text-white bg-blue-700 hover:bg-blue-800 rounded-full px-5 py-2.5 text-center"
        >
          下載壓縮後的圖片
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { compressImage } from '@/utils/compressorUtils.js';
import { readDataURL } from '@/utils/fileUtils.js';

const originalSize = ref(null);
const compressedSize = ref(null);
const originalImage = ref(null);
const compressedImage = ref(null);

// 處理圖像上傳事件
const handleImageUpload = async event => {
  const file = event.target.files[0];
  originalSize.value = `${(file.size / 1024).toFixed(2)} KB`;

  try {
    const result = await compressImage(file);
    compressedSize.value = `${(result.size / 1024).toFixed(2)} KB`;

    // 使用Promise.all等待兩個readDataURL函數完成
    const [originalDataUrl, compressedDataUrl] = await Promise.all([
      readDataURL(file), // 讀取原始圖像的數據URL
      readDataURL(result) // 讀取壓縮後的圖像的數據URL
    ]);

    originalImage.value = originalDataUrl; // 設置原始圖像的數據URL
    compressedImage.value = compressedDataUrl; // 設置壓縮後的圖像的數據URL
  } catch (error) {
    console.error('error:', error.message);
  } finally {
    event.target.value = ''; // 無論成功或失敗都會清空文件輸入元素的值
  }
};
</script>
