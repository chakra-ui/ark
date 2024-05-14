<script setup lang="ts">
import { Progress } from '../..'
</script>

<template>
  <Progress.Root :value="null">
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
  </Progress.Root>
</template>
