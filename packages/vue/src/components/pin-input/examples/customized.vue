<script setup lang="ts">
import { PinInput } from '../..'
</script>

<template>
  <PinInput.Root placeholder="*">
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      <PinInput.Input v-for="id in [0, 1, 2]" :key="id" :index="id" />
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
</template>
