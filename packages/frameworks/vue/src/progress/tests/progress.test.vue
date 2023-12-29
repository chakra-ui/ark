<script setup lang="ts">
import { Progress } from '../'
</script>

<template>
  <Progress.Root>
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Indicator state="loading" />
    <Progress.Track>
      <Progress.Range />
    </Progress.Track>
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
  </Progress.Root>
</template>
