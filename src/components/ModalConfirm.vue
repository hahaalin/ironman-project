<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
  >
    <h1 class="text-xl">
      {{ title }}
    </h1>
    <slot />
    <button
      class="mt-1 ml-auto px-2 border rounded-lg"
      @click="emit('confirm')"
    >
      Confirm
    </button>
  </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal';
import 'vue-final-modal/style.css';
defineProps({
  title: String
});
const emit = defineEmits(['confirm']);
</script>

<style lang="scss" scoped></style>
