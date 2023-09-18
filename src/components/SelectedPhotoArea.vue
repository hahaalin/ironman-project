<template>
  <div class="selectedPhotoArea border p-4">
    <h2 class="photoTitle">加入最愛區</h2>
    <div>
      <draggable
        :list="displayList"
        group="photo"
        chosen-class="chosenClass"
        animation="300"
        item-key="id"
        class="flex flex-wrap bg-neutral-200"
      >
        <template #header>
          <div class="w-full">
            <p>請至上方選取照片，並在此處進行拖曳排序</p>
          </div>
        </template>

        <template #item="{ element, index }">
          <figure
            class="photo w-1/3"
            @click.stop="$emit('openLightBox', index)"
          >
            <div
              class="iconImg delete"
              @click="$emit('inactiveImage', element)"
            >
              <img src="/src/assets/icon/remove.png" width="32" height="32" />
            </div>
            <img
              :src="element.file"
              class="object-cover w-full h-full"
              alt=""
            />
            <p class="bg-amber-300 absolute bottom-0 left-2 p-2">
              {{ index + 1 }}
            </p>
          </figure>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable';
defineProps({
  displayList: Array
});
defineEmits(['inactiveImage', 'openLightBox']);
</script>

<style lang="scss" scoped></style>
