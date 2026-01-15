<script setup lang="ts">
import { NumberInput } from '@ark-ui/vue/number-input'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-vue-next'
import styles from 'styles/number-input.module.css'
</script>

<template>
  <NumberInput.Root :class="styles.Root" :min="0" :max="10">
    <NumberInput.Label :class="styles.Label">Label</NumberInput.Label>
    <NumberInput.Control :class="styles.Control">
      <NumberInput.Input :class="styles.Input" />
      <div :class="styles.TriggerGroup">
        <NumberInput.IncrementTrigger :class="styles.IncrementTrigger">
          <ChevronUpIcon />
        </NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger :class="styles.DecrementTrigger">
          <ChevronDownIcon />
        </NumberInput.DecrementTrigger>
      </div>
    </NumberInput.Control>
  </NumberInput.Root>
</template>
