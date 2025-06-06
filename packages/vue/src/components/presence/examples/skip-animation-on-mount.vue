<script setup lang="ts">
import { Presence } from '@ark-ui/vue/presence'
import { ref } from 'vue'

const isPresent = ref(true)
</script>

<template>
  <div>
    <button @click="isPresent = !isPresent">Toggle</button>
    <Presence :present="isPresent" skip-animation-on-mount>Content</Presence>
  </div>
</template>
