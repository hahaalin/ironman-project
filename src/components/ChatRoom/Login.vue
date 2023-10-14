<template>
  <div class="flex flex-col justify-center items-center">
    <div class="flex flex-col justify-center mb-4">
      <label for="username" class="block mb-4">請輸入暱稱，開始聊天</label>
      <input
        id="username"
        type="text"
        class="border block p-2"
        v-model.trim="username"
        @keyup.enter="$emit('startChat', username)"
      />
    </div>

    <button
      type="button"
      class="boder bg-green-400 p-2"
      @click="$emit('startChat', username)"
      :disabled="!username"
    >
      開始使用
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const username = ref('');
</script>

<style lang="scss" scoped></style>
