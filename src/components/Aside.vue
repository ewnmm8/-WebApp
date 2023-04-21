<script setup>
import { inject } from 'vue'


const Values = inject("Values")

const column_onclick = (value) => {
   Values.index = Values.ary.indexOf(value)
}
const add_button_onclick = () => {
   if (Values.isEmptyInLast()) return
   Values.add()
}
const delete_button_onclick = () => {
   if (!confirm("この項を消します")) return
   Values.delete(Values.index)
}
const all_delete_button_onclick = () => {
   if (!confirm("全て消します")) return
   Values.init()
}
</script>

<template>
   <aside>
      <div id="columns">
         <div class="column" v-for="value in Values.ary" :key="Values.ary.indexOf(value)" @click="() => column_onclick(value)">
            <div class="title">{{ value.title }}</div>
            <div class="content">{{ value.content }}</div>
         </div>
         <div id="add-button" class="column" @click="() => add_button_onclick(value)">+</div>
      </div>
      <div id="menu-bar">
         <button id="delete-button" @click="() => delete_button_onclick">消す</button>
         <button id="all-delete-button" @click="() => all_delete_button_onclick">全部消す</button>
      </div>
   </aside>
</template>