<template>
  <p class="text-xl">螢幕寬：{{ width }} x 螢幕高：{{ height }}</p>

  <p class="text-xl">我是斷點：{{ breakPoint }}</p>

  <div class="container pt-8">
    <button class="px-4 py-2 bg-cyan-500 text-white" v-if="breakPoint === 'default'">
      我是575以下會出現
    </button>
    <button class="px-4 py-2 bg-cyan-500 text-white" v-if="breakPoint === 'sm'">
      我是576以上會出現
    </button>
    <button
      class="px-4 py-2 bg-cyan-500 text-white"
      v-if="breakPoint === 'md' || breakPoint === 'lg'"
    >
      我是768以上才會出現
    </button>
  </div>
</template>

<script setup>
import { watch, computed } from "vue";
import { useWindowSize } from "@vueuse/core";
const { width, height } = useWindowSize();
const breakPoint = computed(() => {
  if (width.value >= 960) {
    return "lg";
  } else if (width.value >= 768) {
    return "md";
  } else if (width.value >= 576) {
    return "sm";
  } else {
    return "default";
  }
});
</script>

<style lang="scss" scoped></style>
