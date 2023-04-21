<script setup>
import { ref, watch } from 'vue'

const isWork = ref(false)
const isPause = ref(true)
const work = ref()
const rest = ref() // work.value.value // rest.value.value
const audio1 = ref()
const audio2 = ref()
const time = ref(0)
const pomodoro = ref(0)
const btn = ref()
let interval_id

const startTime = () => {
   if (time.value <= 0) {
      initTime()
   }
}

const initTime = () => {
   if (interval_id) clearInterval(interval_id)
   btn.value.disabled = false
   isPause.value = false
   isWork.value = !isWork.value
   time.value = isWork.value ? work.value.value : rest.value.value
   time.value *= 60
   interval_id = setInterval(() => {
      time.value -= isPause.value ? 0 :1
   }, 1000)
}

const startOnclick = () => {
   isPause.value = !isPause.value
   startTime()
}

const restartOnclick = () => {
   isWork.value = false
   time.value = -1
   if (isWork.value) pomodoro.value++
   startTime()
}

const audio1Onended = () => {
   audio2.value.play()
}
const audio2Onended = () => {
   if (isWork.value) {
      pomodoro.value++
   }
   startTime()
}

watch(() => time.value, (T) => {
   if (T === 0) {
      isPause.value = true
      btn.value.disabled = true
      audio1.value.play()
   }
})
</script>

<template>
   <div>
      <div>作業<input id="work" value="25" ref="work">分</div>
      <div>休息<input id="rest" value="5" ref="rest">分</div>
      <div id="btn">
         <button @click="() => {startOnclick()}" ref="btn">{{ isPause ? "START" : "PAUSE" }}</button>
         <button @click="() => {restartOnclick()}">RESTART</button>
         <p>{{ pomodoro }}ポモドーロ経過</p>
      </div>
      <div>
         <p>{{ isWork ? "作業" : "休息"}}残り：{{ (time - time % 60) / 60 }}分{{ time % 60 }}秒</p>
      </div>
      <audio ref="audio1" @ended="() => {audio1Onended()}">
         <source src="./assets/mp3/柱時計の鐘.mp3" />>
      </audio>
      <audio ref="audio2" @ended="() => {audio2Onended()}">
         <source src="./assets/mp3/鳩時計2.mp3" />>
      </audio>
   </div>
</template>