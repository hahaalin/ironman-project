<template>
  <div class="container">
    <h1>圖片懶加載 vue3 + Intersection Observer API</h1>

    <hr />
    <div class="image-container mt-8">
      <img
        v-for="(image, index) in images"
        src="src/assets/icon/loading-bar.png"
        :key="image.id"
        :data-src="image.src"
        :alt="image.alt"
        :ref="itemRef(index)"
        width="400"
        height="400"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { images } from '../lib/imgList';

const itemRefs = ref([]);
const image = ref(null);

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');

        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          observer.unobserve(img); // 不再監視已經加載的圖片
        }
      }
    });
  },
  {
    threshold: 0.5 // 在一半的圖片進入可見區域時觸發
  }
);

onMounted(() => {
  itemRefs.value.forEach(img => {
    if (img) {
      observer.observe(img);
    }
  });
});

const itemRef = index => el => {
  if (el) {
    itemRefs.value[index] = el;
  }
};
</script>

<style lang="scss" scoped>
img {
  display: block;
  margin: 1em 0;
}
</style>
