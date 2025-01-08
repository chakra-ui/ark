<script setup lang="ts">
import { Progress } from '@ark-ui/vue/progress'
import { ref } from 'vue'

const value = ref(42)
</script>

<template>
  <Progress.Root v-model="value">
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Track>
      <Progress.Range />
    </Progress.Track>
  </Progress.Root>
</template>
