<script setup></script>

<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal-200 p-6">
    <router-link to="/">PhotoDraggable</router-link>|
    <router-link to="/simple">Simple</router-link>|
    <router-link to="/lightbox">v-easy-lightbox</router-link>|
    <router-link to="/vueFinalModal">vueFinalModal</router-link>|
    <router-link to="/windowResize">windowResize</router-link>|
    <router-link to="/resizeObserver">resizeObserver</router-link>|
    <router-link to="/vueEllipsis">vueEllipsis</router-link>|
    <router-link to="/resizeTextarea">resizeTextarea</router-link>|
    <router-link to="/textToSpeech">TextToSpeech</router-link>
  </nav>
  <router-view />
</template>

<style scoped></style>
