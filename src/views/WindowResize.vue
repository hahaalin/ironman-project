<template>
  <p>螢幕寬：{{ width }} x 螢幕高：{{ height }}</p>

  <p>我是斷點：{{ breakPoint }}</p>
</template>

<script setup>
import { watch, computed } from 'vue';
import { useWindowSize } from '@vueuse/core';
const { width, height } = useWindowSize();
const breakPoint = computed(() => {
  debugger;
  if (width.value >= 960) {
    return 'lg';
  } else if (width.value >= 768) {
    return 'md';
  } else if (width.value >= 576) {
    return 'sm';
  } else {
    return 'default';
  }
});
</script>

<style lang="scss" scoped></style>
