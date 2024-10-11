<script setup lang="ts">
import { Presence } from '@ark-ui/vue/presence'
import { ref } from 'vue'

const isPresent = ref(false)
</script>

<template>
  <div>
    <button @click="isPresent = !isPresent">Toggle</button>
    <Presence :present="isPresent" unmountOnExit>Hidden and Unmounted on Exit</Presence>
  </div>
</template>
