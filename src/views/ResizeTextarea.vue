<template>
  <div class="container">
    <div>
      <label for="input" class="block mb-2">我是一個普通的input</label>
      <input
        type="text"
        id="input"
        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="請輸入文字"
      />
    </div>
    <div>
      <label for="textarea" class="block mb-2">我是一個普通的textarea</label>
      <textarea
        id="textarea"
        rows="4"
        class="block p-2.5 w-full bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="請輸入文字"
      ></textarea>
    </div>
    <div>
      <label for="textarea" class="block mb-2">我是使用Resize Textarea的</label>
      <resize-textarea
        :placeholder="placeholder"
        v-model="textValue"
        :minHeight="46"
        :rows="1"
        :maxHeight="300"
        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
      </resize-textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const textValue = ref('');
const placeholder = ref('This is a test message');
</script>

<style lang="scss" scoped></style>
