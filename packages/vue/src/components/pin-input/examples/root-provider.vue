<script setup lang="ts">
import { PinInput, usePinInput } from '@ark-ui/vue/pin-input'

const pinInput = usePinInput()
</script>

<template>
  <button @click="pinInput.focus()">Focus</button>

  <PinInput.RootProvider :value="pinInput">
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      <PinInput.Input v-for="id in [0, 1, 2]" :key="id" :index="id" />
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.RootProvider>
</template>
