<template>
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="email"
          v-model="email"
          :class="{ 'border-red-500': errMsg }"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          v-model="password"
          :class="{ 'border-red-500': errMsg }"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="signUP"
        >
          註冊
        </button>
        <p class="text-red-500 text-xs italic" v-if="errMsg">
          {{ errMsg }}
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const router = useRouter();

const email = ref('');
const password = ref('');
const errMsg = ref('');
const auth = getAuth();

const signUP = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(userCredential => {
      const user = userCredential.user;
      // console.log('註冊成功', user);
      toast.success('註冊成功，即將跳轉頁面');
      setTimeout(() => {
        router.push('/successSign');
      }, 2000);
    })
    .catch(error => {
      console.log('error', error);
      errMsg.value = '註冊失敗';
    });
};
</script>

<style lang="scss" scoped></style>
