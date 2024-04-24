<script setup lang="ts">
import { Progress } from '../..'
</script>

<template>
  <Progress.Root :model-value="20" :min="10" :max="30">
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Track>
      <Progress.Range />
    </Progress.Track>
  </Progress.Root>
</template>
