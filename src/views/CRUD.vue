<template>
  <div class="mb-4 flex items-center bg-violet-100 p-4">
    <input
      type="text"
      name=""
      id=""
      v-model.trim="todo"
      @keyup.enter="create"
      class="border-b-4 focus:border-violet-400 focus:outline-none flex-1 mr-4 h-10 px-2"
    />
    <button type="button" @click="create" class="border p-2 border-violet-400">
      新增
    </button>
  </div>

  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <ul>
      <li
        v-for="item in todoList"
        :key="item.id"
        class="p-4 border-b-2 flex justify-center items-center"
        :class="{ 'bg-gray-100': item.status }"
      >
        <input
          :id="item.id"
          name="todo"
          type="checkbox"
          v-model="item.status"
          @change="update(item)"
          class="h-4 w-4 border-gray-300 mr-2"
        />

        <label class="flex-1 flex items-center">
          <div v-if="item.id == openUpdateId">
            <input
              type="text"
              v-model="item.text"
              class="border p-2 mr-2 border-violet-400"
              @keyup.enter="update(item)"
            />
            <button
              type="button"
              @click.stop="update(item)"
              class="bg-yellow-200 p-2"
            >
              儲存
            </button>
            <button
              type="button"
              @click.stop="cancel(item)"
              class="bg-red-200 p-2"
            >
              取消
            </button>
          </div>

          <span class="p-2 mr-2" v-else>{{ item.text }}</span>

          <span class="text-sm text-gray-400">
            {{ timestampToCustomFormat(item.date) }}</span
          >
        </label>
        <div>
          <button
            type="button"
            @click.stop="openUpdate(item.id, item.text)"
            class="bg-yellow-400 p-2"
          >
            編輯
          </button>
          <button type="button" class="bg-red-400 p-2" @click="remove(item.id)">
            刪除
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { db } from '@/services/firebase.js';
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { onMounted, onUnmounted, ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const isLoading = ref(true);
const todo = ref('');
const todoList = ref([]);
const openUpdateId = ref();
const openUpdateText = ref();
let unsubscribe;

const create = async () => {
  if (!todo.value) {
    return;
  }
  try {
    const docRef = await addDoc(collection(db, 'todoList'), {
      text: todo.value,
      date: new Date().getTime(),
      status: false
    });
    // console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  } finally {
    todo.value = '';
  }
};

const update = async todoItem => {
  if (todoItem.text == openUpdateText.value) {
    return;
  }

  try {
    await updateDoc(doc(db, 'todoList', todoItem.id), {
      text: todoItem.text,
      status: todoItem.status
    });
    toast.success('更新成功', {
      autoClose: 1000,
      hideProgressBar: true
    });
    openUpdateId.value = '';
  } catch (err) {
    console.error('Error: ', err);
  }
};

const remove = async id => {
  try {
    await deleteDoc(doc(db, 'todoList', id));
    toast.success('刪除成功', {
      autoClose: 1000,
      hideProgressBar: true
    });
  } catch (err) {
    console.error('Error: ', err);
  }
};

const timestampToCustomFormat = timestamp => {
  var date = new Date(timestamp);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes;
};

const openUpdate = (id, text) => {
  openUpdateId.value = id;
  openUpdateText.value = text;
};

const cancel = item => {
  item.text = openUpdateText.value;
  openUpdateId.value = '';
};

onMounted(async () => {
  const lastestQuery = query(
    collection(db, 'todoList'),
    orderBy('date', 'desc')
  );

  unsubscribe = onSnapshot(
    lastestQuery,
    snapshot => {
      todoList.value = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      isLoading.value = false;
    },
    error => {
      console.error('Error getting documents: ', error);
    }
  );
});
onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<style lang="scss" scoped></style>
