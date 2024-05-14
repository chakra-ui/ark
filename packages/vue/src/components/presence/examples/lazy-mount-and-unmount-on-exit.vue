<script setup lang="ts">
import { ref } from 'vue'
import { Presence } from '../..'

const isPresent = ref(false)
</script>

<template>
  <div>
    <button @click="isPresent = !isPresent">Toggle</button>
    <Presence :present="isPresent" lazyMount unmountOnExit>
      Lazy Mount and Unmounted on Exit
    </Presence>
  </div>
</template>
