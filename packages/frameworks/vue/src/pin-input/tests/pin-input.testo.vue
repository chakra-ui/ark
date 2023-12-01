<script setup lang="ts">
import { PinInput } from '../'
</script>

<template>
  <PinInput.Root>
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      <PinInput.Input :key="0" :index="0" />
      <PinInput.Input :key="1" :index="1" />
      <PinInput.Input :key="2" :index="2" />
    </PinInput.Control>
  </PinInput.Root>
</template>
