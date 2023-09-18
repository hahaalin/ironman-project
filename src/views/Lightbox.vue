<template>
  <div class="container max-w-[600px]">
    <photoArea
      :state="state"
      @inactiveImage="inactiveImage"
      @activeImage="activeImage"
      @checkMove="checkMove"
    />
    <selectedPhotoArea
      :displayList="displayList"
      @inactiveImage="inactiveImage"
      @openLightBox="openLightBox"
    />
    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
    ></vue-easy-lightbox>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import selectedPhotoArea from '../components/SelectedPhotoArea.vue';
import photoArea from '../components/PhotoArea.vue';
import VueEasyLightbox from 'vue-easy-lightbox';

const state = reactive({
  list: [
    {
      file: 'https://www.jendow.com.tw/img/7/4b7/nBnauM3X3gTN0ITOxQzNygzM1UTM1QDN5MjM5ADMwAjMwUzL0czL4gzLt92YucmbvRWdo5Cd0FmLyE2LvoDc0RHa.jpg',
      is_active: false
    },
    {
      file: 'https://p3-sdbk2-media.byteimg.com/tos-cn-i-xv4ileqgde/e9af4e25579d4a9cb73fb50cb66cfa6f~tplv-xv4ileqgde-resize-w:750.image',
      is_active: false
    },
    {
      file: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRClFS41hT1zH_27YWKWiOtZXoDnioTvlzI_g&usqp=CAU',
      is_active: false
    }
  ]
});

const displayList = ref(state.list.filter(item => item.is_active));

const activeImage = element => {
  // 修改原物件 is_active
  element.is_active = true;
  // 加入圖片串列
  displayList.value.push(element);
};

const inactiveImage = element => {
  // 修改原物件 is_active
  element.is_active = false;
  // 刪除特定圖片串列
  displayList.value = displayList.value.filter(
    item => item.file !== element.file
  );
};

const checkMove = draggedElement => {
  const indexToDelete = displayList.value.findIndex(
    item => item.file === draggedElement.file
  );
  //如果已經加入過的圖片，則需刪除
  if (indexToDelete !== -1) {
    displayList.value.splice(indexToDelete, 1);
  } else {
    //加入成功的需改變is_active
    draggedElement.is_active = true;
  }
};

const visibleRef = ref(false);
const indexRef = ref(0); // default 0
const imgsRef = ref([]);
const onShow = () => {
  visibleRef.value = true;
};
const onHide = () => (visibleRef.value = false);
const openLightBox = index => {
  imgsRef.value = displayList.value.map(photos => photos.file);
  indexRef.value = index;
  onShow();
};
</script>

<style lang="scss">
.photo {
  @apply relative px-2;
}
.iconImg {
  @apply absolute cursor-pointer right-3 top-0.5;
}
.photoTitle {
  @apply border-b border-solid mb-4 text-xl font-medium text-left;
}

.chosenClass {
  @apply bg-amber-300;
}
</style>
