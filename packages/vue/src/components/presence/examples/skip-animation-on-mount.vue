<script setup lang="ts">
import { Presence } from '@ark-ui/vue/presence'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/presence.module.css'

const isPresent = ref(true)
</script>

<template>
  <div class="stack">
    <button :class="button.Root" @click="isPresent = !isPresent">Toggle</button>
    <Presence :class="styles.Box" :present="isPresent" skip-animation-on-mount>No Initial Animation</Presence>
  </div>
</template>
