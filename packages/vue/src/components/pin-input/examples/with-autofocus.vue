<script setup lang="ts">
import { PinInput } from '@ark-ui/vue/pin-input'
</script>

<template>
  <PinInput.Root :autoFocus="true">
    <PinInput.Label>PIN (auto-focused)</PinInput.Label>
    <PinInput.Control>
      <PinInput.Input v-for="id in [0, 1, 2, 3]" :key="id" :index="id" />
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
</template>
