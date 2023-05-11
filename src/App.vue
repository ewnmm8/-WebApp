<script setup>
import { ref, watch } from 'vue'
import { audioPlay } from './components/Audio'
import { sec, min } from './components/func'

const time = ref(0)
const work_count = ref(0)
const rest_count = ref(0)
const is_work = ref(false)
const is_play = ref(false)

setInterval(() => {
   if (is_play.value) time.value -= 1
}, 1000)
watch(time, () => {
   if (time.value === 0) {
      audioPlay(() => {
         if (time.value <= 0) {
            is_work.value = !is_work.value
         }
      })
   }
})
watch(is_work, () => {
   if (is_work.value) {
      work_count.value++
      time.value = 25*60
   }
   else {
      rest_count.value++
      time.value = 5*60
   }
})

is_work.value = true
</script>

<template>
   <button class="btn blue" :disabled="!is_work" @click="() => {is_work = !is_work}">{{ rest_count }}</button>
   <div id="time" @click="() => {is_play = !is_play}">
      <div>{{ min(time) }}</div>
      <div>:</div>
      <div>{{ sec(time) }}</div>
   </div>
   <button class="btn red" :disabled="is_work" @click="() => {is_work = !is_work}">{{ work_count }}</button>
</template>