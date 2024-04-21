<script setup lang="ts">
import { Progress } from '../..'
</script>

<template>
  <Progress.Root :model-value="70">
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Track>
      <Progress.Range />
    </Progress.Track>
  </Progress.Root>
</template>
