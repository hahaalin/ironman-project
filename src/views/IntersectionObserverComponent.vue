<template>
  <div>
    <div ref="componentA" class="mb-[600px] w-[500px] h-[500px]">
      <AsyncComponentA v-if="loadedA" />
    </div>
    <div ref="componentB" class="mb-[600px] w-[500px] h-[500px]">
      <AsyncComponentB v-if="loadedB" />
    </div>
    <div ref="componentC" class="w-[500px] h-[500px]">
      <AsyncComponentC v-if="loadedC" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
const componentA = ref(null);
const componentB = ref(null);
const componentC = ref(null);

const loadedA = ref(false);
const loadedB = ref(false);
const loadedC = ref(false);

const AsyncComponentA = defineAsyncComponent(() =>
  import('../components/AsyncComponent/AsyncComponentA.vue')
);
const AsyncComponentB = defineAsyncComponent(() =>
  import('../components/AsyncComponent/AsyncComponentB.vue')
);
const AsyncComponentC = defineAsyncComponent(() =>
  import('../components/AsyncComponent/AsyncComponentC.vue')
);

onMounted(() => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        switch (entry.target) {
          case componentA.value:
            loadedA.value = true;
            observer.unobserve(componentA.value); // 停止觀察
            break;
          case componentB.value:
            loadedB.value = true;
            observer.unobserve(componentB.value);
            break;
          case componentC.value:
            loadedC.value = true;
            observer.unobserve(componentC.value);
            break;
        }
      }
    });
  });

  observer.observe(componentA.value);
  observer.observe(componentB.value);
  observer.observe(componentC.value);
});
</script>

<style lang="scss" scoped></style>
