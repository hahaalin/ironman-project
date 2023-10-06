<template>
  <div class="container">
    <h1 class="mb-4">v-memo範例</h1>
    <hr />

    <div class="flex mt-4">
      <button @click="selectItem(1)">選擇項目 1</button>
      <button @click="selectItem(2)">選擇項目 2</button>
      <button @click="selectItem(3)">選擇項目 3</button>
    </div>
    <ul>
      <li v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
        <p>ID: {{ item.id }}</p>
        <p :class="{ 'text-blue-600': item.id === selected }">
          選中: {{ item.id === selected }}
        </p>
        <p>{{ logRender(item.id) }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const list = [
  { id: 1, name: '項目 1' },
  { id: 2, name: '項目 2' },
  { id: 3, name: '項目 3' }
];

const selected = ref(null);

const selectItem = id => {
  selected.value = id;
};

const logRender = id => {
  console.log(`Rendering item with ID: ${id}`);
  return `Rendering item with ID: ${id}`;
};
</script>

<style lang="scss" scoped>
button {
  @apply border border-green-500 block m-2  p-2;
}

li {
  @apply border bg-slate-100  p-2 m-2;
}
</style>
