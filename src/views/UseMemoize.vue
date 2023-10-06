<template>
  <div class="container">
    <h1 class="mb-4">UseMemoize範例</h1>
    <hr />
    <div class="flex mt-4">
      <button @click="getData(1)">獲取數據1</button>
      <button @click="getData(2)">獲取數據2</button>
    </div>
    <div class="mt-4">
      {{ data }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMemoize } from '@vueuse/core';
import axios from 'axios';

const data = ref(null);

const getUseMemoizeData = useMemoize(async id => {
  const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
  const { data } = await axios.get(url);
  return data;
});

const getData = async id => {
  await getUseMemoizeData(id).then(res => {
    data.value = res;
  });
};
</script>

<style lang="scss" scoped>
button {
  @apply border border-green-500 block m-2 bg-white p-2;
}
</style>
