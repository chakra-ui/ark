<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { NumberInput } from '@ark-ui/vue/number-input'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-vue-next'
import field from 'styles/field.module.css'
import styles from 'styles/number-input.module.css'
</script>

<template>
  <Field.Root :class="field.Root">
    <NumberInput.Root :class="styles.Root">
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
    <Field.HelperText :class="field.HelperText">Additional Info</Field.HelperText>
    <Field.ErrorText :class="field.ErrorText">Error Info</Field.ErrorText>
  </Field.Root>
</template>
