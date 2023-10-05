<template>
  <div class="container">
    <h1 class="mb-4">vue-onboarding範例</h1>
    <hr />
    <div class="my-4">
      <button
        type="button"
        v-for="(component, index) in componentNames"
        :key="index"
        @click="loadComponent(component.name)"
        class="bg-gray-200 rounded-none p-2"
        :class="{ 'bg-green-500': currentComponentName === component.name }"
      >
        {{ component.title }}
      </button>
    </div>
    <component :is="currentComponent"></component>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const componentMap = {
  Basic: () => import('../components/Onboarding/Basic.vue'),
  Custom: () => import('../components/Onboarding/Custom.vue')
};

const currentComponent = ref(null);
const currentComponentName = ref('Basic');

const componentNames = reactive([
  { title: '基本樣式', name: 'Basic' },
  { title: '自定義樣式', name: 'Custom' }
]);

const loadComponent = async componentName => {
  try {
    const component = await componentMap[componentName]();
    currentComponent.value = component.default || component;
    currentComponentName.value = componentName;
  } catch (error) {
    console.error(`無法載入組件 ${componentName}: ${error}`);
  }
};

onMounted(() => {
  loadComponent(currentComponentName.value);
});
</script>

<style lang="scss" scoped></style>
