<template>
  <div>
    <button class="v-button" @click="() => open()">Open Modal</button>
    <ModalsContainer />
  </div>
</template>

<script setup>
import { ModalsContainer, useModal } from 'vue-final-modal';
import ModalConfirm from './ModalConfirm.vue';
const { open, close } = useModal({
  component: ModalConfirm,
  attrs: {
    title: 'Hello World!',
    onConfirm() {
      close();
    }
  },
  slots: {
    default: '<p>UseModal: The content of the modal</p>'
  }
});
</script>

<style lang="scss" scoped>
.v-button {
  @apply bg-green-500 hover:bg-green-600 focus:ring-green-600 mb-2 inline-flex flex-none items-center rounded-lg border border-transparent px-3 py-1.5 text-sm leading-4 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900;
}
</style>
