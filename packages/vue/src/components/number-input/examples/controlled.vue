<script setup lang="ts">
import { NumberInput } from '@ark-ui/vue/number-input'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/number-input.module.css'

const value = ref('0')
</script>

<template>
  <div class="stack">
    <output>Value: {{ value }}</output>
    <NumberInput.Root :class="styles.Root" v-model="value">
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
  </div>
</template>
