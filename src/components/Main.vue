<script setup>
import { inject } from 'vue'


const Values = inject("Values")
const textarea = inject("textarea")

const oninput = () => {
   Values.save()
}
</script>

<template>
   <main>
      <input class="title" placeholder="タイトル" v-model="Values.ary[Values.index].title" @input="oninput" />
      <div class="border"></div>
      <textarea class="content" placeholder="本文" autofocus ref="textarea" v-model="Values.ary[Values.index].content" @input="oninput"></textarea>
   </main>
</template>