<template>
  <div class="container">
    <h1>Speech color changer</h1>
    <div class="hints">
      <p class="mb-4">
        點擊按鈕後，請嘗試說出一種以下列表顏色的英文，若語音判斷正確，網頁的背景顏色則會變色。
      </p>

      <div class="flex items-center gap-4 mb-8">
        <button
          type="button"
          @click="startRecognition"
          class="border border-gray-300 bg-gray-200"
        >
          開始語音識別
        </button>

        <p class="output bold text-xl">
          <em>{{ diagnosticMessage }}</em>
        </p>
      </div>
      <hr />

      <div class="grid gap-4 grid-cols-5 mt-8">
        <div
          v-for="color in colors"
          :key="color"
          :style="{ backgroundColor: color }"
          class="p-2 border flex flex-wrap justify-between"
        >
          <p>
            {{ color }}
          </p>
          <button
            type="button"
            class="border border-gray-300 bg-white p-0"
            @click="speak(color)"
          >
            <img src="/src/assets/icon/listening.png" width="24" height="24" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { colors } from '../lib/colors.js';

const diagnosticMessage = ref('辨識的結果：');
let recognition = null;
let bg = null;

//文字轉語音
const synth = window.speechSynthesis;
const speak = color => {
  synth.cancel();
  synth.speak(new SpeechSynthesisUtterance(color));
};

//語音轉文字
const startRecognition = () => {
  recognition.start();
  console.log('開始接收輸入的音訊');
  diagnosticMessage.value = '準備接收顏色指令。';
};

onMounted(() => {
  recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.continuous = false;
  // recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  bg = document.querySelector('html');

  if (window.SpeechGrammarList) {
    const speechRecognitionList = new (window.SpeechGrammarList ||
      window.webkitSpeechGrammarList)();
    const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(
      ' | '
    )} ;`;
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
  }

  recognition.onaudiostart = () => {
    console.log('使用者的設備開始接收音訊時會觸發此事件');
  };

  recognition.onsoundstart = () => {
    console.log('設備偵測到任何聲音時便會觸發此事件');
  };

  recognition.onspeechstart = () => {
    console.log('語音辨識伺服器開始辨識出音訊時便會觸發此事件');
  };

  recognition.onresult = event => {
    console.log('語音辨識伺服器結束辨識並回傳結果為:', event.results);
    const resultMsg = event.results[0][0].transcript;
    diagnosticMessage.value = '辨識結果為： ' + resultMsg + '.';
    bg.style.backgroundColor = resultMsg;
    console.log(
      '語音辨識系統對辨識正確性的置信度: ' + event.results[0][0].confidence
    );
  };

  recognition.onspeechend = () => {
    console.log('語音辨識伺服器結束辨識音訊時便會觸發此事件');
    recognition.stop();
    console.log('已停止接收輸入的音訊');
  };

  recognition.onsoundend = () => {
    console.log('設備偵測不到任何聲音時便會觸發此事件');
  };

  recognition.onaudioend = () => {
    console.log('使用者的設備結束接收音訊時會觸發此事件');
  };

  recognition.onend = () => {
    console.log('使用者設備結束與語音辨識伺服器的連結時會觸發此事件');
  };

  recognition.onnomatch = () => {
    diagnosticMessage.value = '我無法辨識該顏色。';
  };

  recognition.onerror = event => {
    diagnosticMessage.value = '辨識過程中出現錯誤： ' + event.error;
  };
});
</script>

<style lang="scss" scoped></style>
