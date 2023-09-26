<template>
  <div class="container">
    <h1>文字轉語音</h1>
    <p>說明：請在下面的輸入框中輸入文字，再按下"播放”按钮播放。</p>
    <p>備註：可調整語音速度/音調/發音語系</p>
    <hr />
    <form @submit.prevent="speak" class="pt-8">
      <label for="txt">輸入文字</label>
      <textarea
        id="txt"
        v-model="inputTxt"
        rows="4"
        class="w-[80%] block p-2.5 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="請輸入文字"
      ></textarea>
      <div>
        <label for="rate">速度</label>
        <input
          v-model="rateValue"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          id="rate"
        />
        <div class="rate-value">{{ rateValue }}</div>
        <div class="clearfix"></div>
      </div>
      <div>
        <label for="pitch">音調</label>
        <input
          v-model="pitchValue"
          type="range"
          min="0"
          max="2"
          step="0.1"
          id="pitch"
        />
        <div class="pitch-value">{{ pitchValue }}</div>
        <div class="clearfix"></div>
      </div>
      <select
        v-model="selectedVoice"
        class="block p-2.5 w-full bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      >
        <option v-for="voice in voices" :key="voice.name" :value="voice.name">
          {{ `${voice.name} (${voice.lang})`
          }}{{ voice.default ? '(預設)' : '' }}
        </option>
      </select>
      <div class="controls">
        <button id="play" type="submit" class="border border-gray-300">
          播放
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const inputTxt = ref('');
const selectedVoice = ref('');
const rateValue = ref(1);
const pitchValue = ref(1);
const voices = ref([]);
const synth = window.speechSynthesis;

const populateVoiceList = () => {
  voices.value = synth
    .getVoices()
    .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()));

  if (!selectedVoice.value && voices.value.length > 0) {
    selectedVoice.value = voices.value.filter(i => i.default == true)[0].name;
  }
};

const speak = () => {
  if (synth.speaking) {
    synth.cancel(); //如果正在播放就先取消所有
    console.log('speechSynthesis.speaking');
    return;
  }

  if (inputTxt.value !== '') {
    const utterThis = new SpeechSynthesisUtterance(inputTxt.value);

    utterThis.onend = () => {
      console.log('SpeechSynthesisUtterance.onend');
    };

    utterThis.onerror = () => {
      console.error('SpeechSynthesisUtterance.onerror');
    };

    for (const voice of voices.value) {
      if (voice.name === selectedVoice.value) {
        utterThis.voice = voice;
        break;
      }
    }
    utterThis.pitch = pitchValue.value;
    utterThis.rate = rateValue.value;
    synth.speak(utterThis);
  }
};
onMounted(() => {
  populateVoiceList();

  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
  }
});
</script>

<style lang="scss" scoped>
.txt,
select,
form > div {
  display: block;
  margin: 0 auto;
  font-family: sans-serif;
  font-size: 16px;
  padding: 5px;
}

.txt {
  width: 80%;
}

select {
  width: 83%;
}

form > div {
  width: 81%;
}

.txt,
form > div {
  margin-bottom: 10px;
  overflow: auto;
}

.clearfix {
  clear: both;
}

label {
  float: left;
  width: 10%;
  line-height: 1.5;
}

.rate-value,
.pitch-value {
  float: right;
  width: 5%;
  line-height: 1.5;
}

#rate,
#pitch {
  float: right;
  width: 81%;
}

.controls {
  text-align: center;
  margin-top: 10px;
}

.controls button {
  padding: 10px;
}
</style>
