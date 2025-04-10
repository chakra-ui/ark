<script setup lang="ts">
import { Progress, useProgress } from '@ark-ui/vue/progress'

const progress = useProgress()
</script>

<template>
  <button @click="progress.setToMax()">Set to MAX</button>

  <Progress.Root>
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Track>
      <Progress.Range />
    </Progress.Track>
  </Progress.Root>
</template>
