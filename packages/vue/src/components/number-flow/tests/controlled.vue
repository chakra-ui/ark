<script setup lang="ts">
import { ref } from 'vue'
import { NumberFlow } from '../index.ts'

const value = ref(99)
</script>

<template>
  <NumberFlow.Root v-model="value" locale="en-US">
    <NumberFlow.Segments />
    <NumberFlow.HiddenValueText />
  </NumberFlow.Root>
  <button @click="value = 1000">Update</button>
</template>
