<script setup>
const props = defineProps({
   'src': String
})
</script>

<template>
<button><img :src='src'></button>
</template>