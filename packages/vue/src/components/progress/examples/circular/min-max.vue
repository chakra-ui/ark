<script setup lang="ts">
import { Progress } from '@ark-ui/vue/progress'
</script>

<template>
  <Progress.Root :model-value="20" :min="10" :max="30">
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
  </Progress.Root>
</template>
