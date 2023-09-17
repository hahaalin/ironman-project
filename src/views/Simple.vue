<template>
  <draggable
    v-model="myArray.list"
    ghost-class="ghost"
    @start="drag = true"
    @end="drag = false"
    item-key="id"
  >
    <template #item="{ element }">
      <div class="list">{{ element.name }}</div>
    </template>
  </draggable>
</template>

<script setup>
import { reactive } from 'vue';
import draggable from 'vuedraggable';

const myArray = reactive({
  list: [
    {
      name: 'John',
      id: 0
    },
    {
      name: 'Joao',
      id: 1
    },
    {
      name: 'Jean',
      id: 2
    }
  ]
});
</script>

<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list {
  border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
