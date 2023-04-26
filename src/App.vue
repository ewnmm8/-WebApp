<script setup>
import { onMounted, ref, watch } from 'vue'
import { audioPlay } from './components/Audio'
import { formatMin, numToSec, numToMin, formatSpan } from './components/func'
import PlayPng from './assets/img/Play.png'
import PausePng from './assets/img/Pause.png'
import NextPng from './assets/img/Next.png'
import Button from './components/Button.vue'

const time_work = ref(25)
const time_rest = ref(5)
const time = ref(formatMin(time_work.value))
setInterval(() => {
   if (time.value > 0 && isPlay.value) time.value -= 1
}, 1000)

const isWork = ref(true)
const isPlay = ref(false)
const isWondowHidden = ref(true)
const history = ref()
const char = {
   true: "🔥",
   false: "😪"
}
const setTIme= () => {
   if (isWork.value) {
      time.value = formatMin(time_work.value)
   }
   else {
      time.value = formatMin(time_rest.value)
   }
   history.value.innerHTML += formatSpan(char[isWork.value])
}

watch(time, time => {
   if (time === 0) {
      audioPlay(() => {
         isWork.value = !isWork.value
      })
   }
})
watch(isWork, setTIme)
onMounted(() => {
   history.value.innerHTML = formatSpan(char[true])
})
</script>

<template>
   <div id="window" :style="isWondowHidden ? 'display: none;' : ''">
      <input v-model="time_work" placeholder="work">
      <input v-model="time_rest" placeholder="rest">
   </div>
   <div id="Time" @click="isWondowHidden = !isWondowHidden">{{ numToMin(time) }}:{{ numToSec(time) }}</div>
   <div id="History" ref="history"><span></span></div>
   <div>
      <Button :src="PausePng" @click="() => {isPlay = !isPlay}" v-if="isPlay" />
      <Button :src="PlayPng" @click="() => {isPlay = !isPlay}" v-else />
      <Button :src="NextPng" @click="() => {isWork = !isWork}" />
   </div>
</template>