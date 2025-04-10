<script setup lang="ts">
import { Progress, useProgress } from '@ark-ui/vue/progress'

const progress = useProgress()
</script>

<template>
  <button @click="progress.setToMax()">Set to MAX</button>

  <Progress.Root>
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
  </Progress.Root>
</template>
