<template>
  <main class="w-full text-gray-700" x-data="layout">
    <header
      class="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2"
    >
      <div class="container px-4">
        <div class="flex items-center space-x-2 justify-between">
          <div class="flex justify-center items-center">
            <img src="/vite.svg" alt="" />
            <h1 class="text-sm font-bold">範例Demo</h1>
          </div>

          <button
            type="button"
            class="hover:border-green-600"
            @click="asideOpen = !asideOpen"
          >
            <img src="src/assets/icon/menu.png" alt="" width="20" />
          </button>
        </div>
      </div>
    </header>

    <div class="container flex min-h-screen">
      <!-- aside -->
      <aside
        class="flex w-72 flex-col space-y-2 border-r-2 border-gray-100 bg-white p-2"
        v-show="asideOpen"
      >
        <router-link to="/">PhotoDraggable</router-link>
        <router-link to="/simple">Simple</router-link>
        <router-link to="/lightbox">v-easy-lightbox</router-link>
        <router-link to="/vueFinalModal">vueFinalModal</router-link>
        <router-link to="/windowResize">windowResize</router-link>
        <router-link to="/resizeObserver">resizeObserver</router-link>
        <router-link to="/vueEllipsis">vueEllipsis</router-link>
        <router-link to="/resizeTextarea">resizeTextarea</router-link>
        <router-link to="/textToSpeech">TextToSpeech</router-link>
        <router-link to="/speechToText">SpeechRecognition</router-link>
        <router-link to="/compressorImg">CompressorImg</router-link>
        <router-link to="/toastify">Toastify</router-link>
        <router-link to="/intersectionObserverImg"
          >IntersectionObserverImg</router-link
        >
      </aside>

      <!-- main content page -->
      <div class="w-full p-4">
        <router-view />
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref } from 'vue';

const asideOpen = ref(true);
</script>

<style scoped>
a {
  @apply flex items-center text-gray-800 space-x-1 text-sm py-2 px-2  hover:text-green-600;
}
.router-link-active {
  @apply text-green-600;
}
</style>
