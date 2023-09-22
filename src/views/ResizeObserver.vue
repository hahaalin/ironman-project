<template>
  <div class="container pt-8 border">
    <ul ref="el" class="bg-amber-200 w-1/2 p-4 m-auto">
      <li class="text-xl">我是ul的寬: {{ ulWidth }} x 高{{ ulHeight }}</li>
    </ul>

    <div class="px-4 py-2 bg-cyan-500 text-white mt-2" v-if="ulWidth <= 350">
      我是ul的寬度350以下才要出現
      <img
        src="https://miro.medium.com/v2/resize:fit:720/1*XGw9zUEZGYPNmeKGmyeX1g.jpeg"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useResizeObserver } from '@vueuse/core';
const el = ref(null);
const ulWidth = ref(0);
const ulHeight = ref(0);

useResizeObserver(el, entries => {
  const entry = entries[0];
  console.log('entry', entry);
  const { width, height } = entry.contentRect;
  ulWidth.value = width;
  ulHeight.value = height;
});
</script>

<style lang="scss" scoped></style>
