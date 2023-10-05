<template>
  <div>
    <div class="flex mb-4">
      <button @click="start" class="p-2 border border-green-500 block m-2">
        Start Onboarding
      </button>
      <button @click="finish" class="p-2 border border-green-500 block m-2">
        Finish Onboarding
      </button>
      <button
        @click="() => goToStep(1)"
        class="p-2 border border-green-500 block m-2"
      >
        Click to go second step
      </button>
    </div>

    <VOnboardingWrapper ref="wrapper" :steps="steps" :options="options">
      <template
        #default="{ previous, next, step, exit, isFirst, isLast, index }"
      >
        <VOnboardingStep>
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="sm:flex sm:items-center sm:justify-between">
                <div v-if="step.content">
                  <h3
                    v-if="step.content.title"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    {{ step.content.title }}
                  </h3>
                  <div
                    v-if="step.content.description"
                    class="mt-2 max-w-xl text-sm text-gray-500"
                  >
                    <p>{{ step.content.description }}</p>
                  </div>
                </div>
                <div
                  class="mt-5 space-x-4 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center relative"
                >
                  <span
                    class="absolute right-0 bottom-full mb-2 mr-2 text-gray-600 font-medium text-xs"
                    >{{ `${index + 1}/${steps.length}` }}</span
                  >
                  <template v-if="!isFirst">
                    <button
                      @click="previous"
                      type="button"
                      class="inline-flex items-center justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 font-medium text-yellow-700 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:text-sm"
                    >
                      Previous
                    </button>
                  </template>
                  <button
                    @click="next"
                    type="button"
                    class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                  >
                    {{ isLast ? 'Finish' : 'Next' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </VOnboardingStep>
      </template>
    </VOnboardingWrapper>
    <p id="foo">custom test</p>
    <p id="bar">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem
      provident iste illum molestias pariatur! Totam, provident reprehenderit
      alias officia repellendus fugiat cupiditate iste cumque ipsa error dolores
      facilis, illo ratione?
    </p>
  </div>
</template>

<script setup>
import { defineComponent, ref } from 'vue';
import {
  VOnboardingWrapper,
  VOnboardingStep,
  useVOnboarding
} from 'v-onboarding';

const wrapper = ref(null);
const { start, goToStep, finish } = useVOnboarding(wrapper);
const steps = [
  {
    attachTo: { element: '#foo' },
    content: { title: 'Welcome!' }
  },
  {
    attachTo: { element: '#bar' },
    content: {
      title: 'Testing v-onboarding..',
      description:
        'Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
    }
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

<style lang="scss">
[data-v-onboarding-wrapper] [data-popper-arrow]::before {
  content: '';
  background: var(--v-onboarding-step-arrow-background, white);
  top: 0;
  left: 0;
  transition: transform 0.2s ease-out, visibility 0.2s ease-out;
  visibility: visible;
  transform: translateX(0px) rotate(45deg);
  transform-origin: center;
  width: var(--v-onboarding-step-arrow-size, 10px);
  height: var(--v-onboarding-step-arrow-size, 10px);
  position: absolute;
  z-index: -1;
}

[data-v-onboarding-wrapper]
  [data-popper-placement^='top']
  > [data-popper-arrow] {
  bottom: 5px;
}

[data-v-onboarding-wrapper]
  [data-popper-placement^='right']
  > [data-popper-arrow] {
  left: -4px;
}

[data-v-onboarding-wrapper]
  [data-popper-placement^='bottom']
  > [data-popper-arrow] {
  top: -4px;
}

[data-v-onboarding-wrapper]
  [data-popper-placement^='left']
  > [data-popper-arrow] {
  right: -4px;
}
</style>
