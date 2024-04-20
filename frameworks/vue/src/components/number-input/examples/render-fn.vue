<script setup lang="ts">
null
</script>

<template>
  <NumberInput.Root v-slot="{ valueAsNumber }">
    <NumberInput.Scrubber />
    <NumberInput.Label>Label</NumberInput.Label>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
    </NumberInput.Control>
    <div>Value: {{ valueAsNumber }}</div>
  </NumberInput.Root>
</template>
