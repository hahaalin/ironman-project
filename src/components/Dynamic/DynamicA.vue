<template>
  <div>
    <button @click="show = !show" class="bg-yellow-400 p-2">
      點我打開視窗
    </button>
    <dynamicModel v-if="show" />
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import ErrorComponent from './Error.vue';
import LoadingComponent from './Loading.vue';
// import dynamicModel from './DynamicModel.vue';

const dynamicModel = defineAsyncComponent({
  loader: () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('../Dynamic/DynamicModel.vue'));
      }, 3000); // 模擬3秒的載入時間
    }),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 1000,
  timeout: 10000
});
const show = ref(false);
</script>

<style lang="scss" scoped></style>
