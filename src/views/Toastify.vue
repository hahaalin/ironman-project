<template>
  <div class="container">
    <h1>vue3-toastify 範例</h1>
    <p>
      參考資料：<a href="https://vue3-toastify.js-bridge.com/" target="_block"
        >https://vue3-toastify.js-bridge.com/</a
      >
    </p>
    <hr class="my-6" />
    <button @click="notify" class="border border-gray-600">
      點我會打開 Notify
    </button>
  </div>
</template>

<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const notify = () => {
  toast('Wow so easy !');
  toast.info('Hello!!');
  toast.error('Hello!!');
  toast.success('Hello!!');
  toast.success('Hello!!', {
    theme: 'colored',
    position: toast.POSITION.TOP_LEFT
  });
  toast.warn('Hello!!', {
    position: toast.POSITION.TOP_LEFT
  });
};
</script>

<style lang="scss" scoped></style>
