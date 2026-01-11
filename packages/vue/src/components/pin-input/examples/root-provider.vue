<script setup lang="ts">
import { PinInput, usePinInput } from '@ark-ui/vue/pin-input'
import styles from 'styles/pin-input.module.css'

const pinInput = usePinInput()
</script>

<template>
  <div class="stack">
    <button @click="pinInput.focus()">Focus</button>

    <PinInput.RootProvider :value="pinInput" :class="styles.Root">
      <PinInput.Label :class="styles.Label">Label</PinInput.Label>
      <PinInput.Control :class="styles.Control">
        <PinInput.Input v-for="id in [0, 1, 2]" :key="id" :index="id" :class="styles.Input" />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput.RootProvider>
  </div>
</template>
