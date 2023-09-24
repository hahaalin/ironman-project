<template>
  <div class="container">
    <article class="mb-4">
      vue-ellipsis-3是一個高效能、可自訂的vue
      文字縮略元件。支援自訂縮略符、尾文本過濾、富文本縮略等功能。
    </article>
    <!-- 超過父層指定寬度會自動省略 -->
    <div class="mb-4">
      <h2 class="text-left text-xl">最簡單的使用範例</h2>
      <hr />
      <div class="bg-slate-200 w-[200px] mt-4">
        <vue-ellipsis-3
          text="這是一段非常非常非常非常非常非常非常非常非常非常非常長的话"
        />
      </div>
    </div>

    <div class="mb-4">
      <h2 class="text-left text-xl">實務範例(visible-line="4"/text:string)</h2>
      <hr />
      <div class="bg-slate-200 w-[200px] mt-4">
        <vue-ellipsis-3 :text="text" :visible-line="4"></vue-ellipsis-3>
      </div>
    </div>

    <div class="mb-4">
      <h2 class="text-left text-xl">實務範例(visible-line="4"/text:html)</h2>
      <hr />
      <div class="bg-slate-200 w-[200px] mt-4">
        <vue-ellipsis-3
          :text="textHtml"
          :visible-line="4"
          useInnerHtml
          :ellipsis="ellipsis"
        >
          <template v-slot:ellipsisNode>
            <button type="button" class="text-xs p-0" @click="expand()">
              ...顯示更多
            </button>
          </template>
        </vue-ellipsis-3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { VueEllipsis3 } from 'vue-ellipsis-3';

const ellipsis = ref(true);
const textHtml = ref(
  '<p>vue-ellipsis-3是一個<b>高效能、可自訂的vue 文字縮略元件。</b>支援自訂縮略符、尾文本過濾、富文本縮略等功能。<p>靈感來自於react-ellipsis-component。</p>'
);
const text = ref(
  'vue-ellipsis-3是一個<支援自訂縮略符、尾文本過濾、富文本縮略等功能。>高效能、可自訂的vue 文字縮略元件。支援自訂縮略符、尾文本過濾、富文本縮略等功能。<>靈感來自於react-ellipsis-component。'
);

const expand = () => {
  ellipsis.value = false;
};
</script>

<style lang="scss" scoped></style>
