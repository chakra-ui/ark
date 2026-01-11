<script setup lang="ts">
import { PinInput } from '@ark-ui/vue/pin-input'
import styles from 'styles/pin-input.module.css'
</script>

<template>
  <PinInput.Root :class="styles.Root" mask>
    <PinInput.Label :class="styles.Label">Label</PinInput.Label>
    <PinInput.Control :class="styles.Control">
      <PinInput.Input v-for="id in [0, 1, 2]" :key="id" :index="id" :class="styles.Input" />
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
</template>
