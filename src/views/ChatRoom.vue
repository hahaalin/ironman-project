<template>
  <div class="container my-3">
    <h1 class="text-2xl text-center my-3">vue + firebase 線上即時聊天室</h1>
    <p class="text-red-400 text-center">
      此功能僅供測試，✪請勿輸入具有攻擊性、不堪入耳的言語✪
    </p>

    <Login @startChat="startChat" v-if="step === 1" />
    <Chat :username="username" v-else />
  </div>
</template>

<script setup>
import Login from '../components/ChatRoom/Login.vue';
import Chat from '../components/ChatRoom/Chat.vue';
import { ref } from 'vue';
const step = ref(1);
const username = ref('');
const startChat = (name) => {
  step.value = 2;
  username.value = name;
};
</script>

<style lang="scss" scoped></style>
