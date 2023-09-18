<template>
  <div class="photoArea mb-6 border p-4">
    <h2 class="photoTitle">照片選擇區</h2>
    <div class="">
      <draggable
        class="flex flex-wrap"
        :list="state.list"
        :group="{ name: 'photo', pull: 'clone', put: false }"
        chosen-class="chosenClass"
        :sort="false"
        item-key="name"
        :move="checkMove"
      >
        <template #item="{ element }">
          <figure class="photo w-1/3">
            <div
              class="iconImg checked"
              v-if="element.is_active"
              @click="$emit('inactiveImage', element)"
            >
              <img src="/src/assets/icon/check.png" width="32" height="32" />
            </div>
            <div
              class="iconImg unChecked"
              v-else
              @click="$emit('activeImage', element)"
            >
              <img src="/src/assets/icon/uncheck.png" width="32" height="32" />
            </div>
            <img :src="element.file" class="object-cover w-full h-full" />
          </figure>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable';

defineProps({
  state: Object
});

const emit = defineEmits(['checkMove', 'inactiveImage', 'activeImage']);

const checkMove = function (evt) {
  //   console.log('e', evt.draggedContext.element);
  const draggedElement = evt.draggedContext.element;

  emit('checkMove', draggedElement);
};
</script>

<style lang="scss" scoped></style>
