<template>
  <div>
    <VOnboardingWrapper ref="wrapper" :steps="steps" :options="options" />

    <div class="flex mb-4">
      <button @click="start" class="p-2">Start Onboarding</button>
      <button @click="finish" class="p-2">Finish Onboarding</button>
      <button @click="() => goToStep(1)" class="p-2">
        Click to go second step
      </button>
    </div>

    <div class="p-8">
      <p id="foo">Welcome!</p>
    </div>

    <div class="bar">
      <img src="/vite.svg" alt="" width="300" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { VOnboardingWrapper, useVOnboarding } from 'v-onboarding';
import 'v-onboarding/dist/style.css';

const wrapper = ref(null);
const { start, goToStep, finish } = useVOnboarding(wrapper);
const steps = [
  {
    attachTo: { element: '#foo' },
    content: { title: 'welcome' }
  },
  {
    attachTo: { element: '.bar' },
    content: {
      title: 'Do it!',
      description: '測試'
    }
  },
  {
    attachTo: { element: '#demo' },
    content: { title: '回到首頁' }
  }
];

const options = {
  popper: {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10]
        }
      }
    ]
  },
  labels: {
    previousButton: '上一步',
    nextButton: '下一步',
    finishButton: '完成'
  }
};
</script>

<style lang="scss" scoped>
button {
  @apply border border-green-500 block m-2 bg-white;
}
</style>

<style lang="scss">
:root {
  --v-onboarding-overlay-fill: lightseagreen;
}
</style>
