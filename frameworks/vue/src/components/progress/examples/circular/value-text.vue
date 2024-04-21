<script setup lang="ts">
import { Progress } from '../..'
</script>

<template>
  <Progress.Root
    :translations="{
      value: ({ value, max }) => (value == null ? 'Loading...' : `${value} of ${max} items loaded`),
    }"
  >
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
  </Progress.Root>
</template>
