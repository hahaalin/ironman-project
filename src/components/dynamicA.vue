<template>
  <div>
    <button @click="show = !show">點我打開視窗</button>
    <dynamicModel v-if="show" />
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
// import dynamicModel from './dynamicModel.vue';

const dynamicModel = defineAsyncComponent(() => import('./dynamicModel.vue'));
const show = ref(false);
</script>

<style lang="scss" scoped></style>
