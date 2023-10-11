<template>
  <main class="w-full text-gray-700" x-data="layout">
    <header
      class="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2"
    >
      <div class="container px-4">
        <div class="flex items-center space-x-2 justify-between">
          <div class="flex justify-center items-center">
            <img src="/vite.svg" alt="" />
            <h1 class="text-sm font-bold" id="demo">範例Demo</h1>
          </div>
          <div class="flex items-center">
            <button
              type="button"
              class="bg-yellow-500 text-white p-2"
              @click="goToSignIn"
              v-if="!isLoggedIn"
            >
              登入
            </button>
            <button
              type="button"
              class="bg-yellow-500 text-white p-2"
              @click="handleSignOut"
              v-if="isLoggedIn"
            >
              登出
            </button>
            <button
              type="button"
              class="bg-purple-500 text-white p-2"
              @click="goToSignUP"
            >
              註冊
            </button>
            <button
              type="button"
              class="hover:border-green-600"
              @click="asideOpen = !asideOpen"
            >
              <img src="/src/assets/icon/menu.png" alt="" width="20" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="container flex min-h-screen">
      <!-- aside -->
      <aside
        class="flex w-72 flex-col space-y-2 border-r-2 border-gray-100 bg-white p-2"
        v-show="asideOpen"
      >
        <router-link v-for="link in links" :key="link.to" :to="link.to">
          {{ link.text }}
        </router-link>
      </aside>

      <!-- main content page -->
      <div class="w-full p-4">
        <router-view />
      </div>
    </div>
  </main>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
const auth = getAuth();
const router = useRouter();
const asideOpen = ref(true);

const links = ref([
  { text: 'PhotoDraggable', to: '/' },
  { text: 'v-easy-lightbox', to: '/lightbox' },
  { text: 'vueFinalModal', to: '/vueFinalModal' },
  { text: 'windowResize', to: '/windowResize' },
  { text: 'resizeObserver', to: '/resizeObserver' },
  { text: 'vueEllipsis', to: '/vueEllipsis' },
  { text: 'resizeTextarea', to: '/resizeTextarea' },
  { text: 'TextToSpeech', to: '/textToSpeech' },
  { text: 'speechToText', to: '/speechToText' },
  { text: 'CompressorImg', to: '/CompressorImg' },
  { text: 'toastify', to: '/Toastify' },
  { text: 'intersectionObserverImg', to: '/intersectionObserverImg' },
  { text: 'AsyncComponent', to: '/asyncComponent' },
  {
    text: 'intersectionObserverComponent',
    to: '/intersectionObserverComponent'
  },
  {
    text: 'Onboarding',
    to: '/onboarding'
  },
  {
    text: 'Vmemo',
    to: '/vmemo'
  },
  {
    text: 'UseMemoize',
    to: '/useMemoize'
  },
  {
    text: 'SuccessSign',
    to: '/successSign'
  },
  {
    text: 'CRUD',
    to: '/CRUD'
  },
  {
    text: 'UploadToFirebase',
    to: '/uploadToFirebase'
  }
]);

const goToSignUP = () => {
  router.push('/signUp');
};
const goToSignIn = () => {
  router.push('/signIn');
};

const isLoggedIn = ref(false);
const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log('已登出');
      isLoggedIn.value = false;
      router.push('/');
    })
    .catch(error => {
      console.log('登出失敗', error);
    });
};

onMounted(() => {
  onAuthStateChanged(auth, user => {
    user ? (isLoggedIn.value = true) : (isLoggedIn.value = false);
  });
});
</script>

<style scoped>
a {
  @apply flex items-center text-gray-800 space-x-1 text-sm py-2 px-2  hover:text-green-600;
}
.router-link-active {
  @apply text-green-600;
}
</style>
