<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { PinInput } from '@ark-ui/vue/pin-input'
import fieldStyles from 'styles/field.module.css'
import styles from 'styles/pin-input.module.css'
</script>

<template>
  <Field.Root :class="fieldStyles.Root">
    <PinInput.Root :class="styles.Root">
      <PinInput.Label :class="styles.Label">Label</PinInput.Label>
      <PinInput.Control :class="styles.Control">
        <PinInput.Input v-for="id in [0, 1, 2]" :key="id" :index="id" :class="styles.Input" />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput.Root>
    <Field.HelperText :class="fieldStyles.HelperText">Additional Info</Field.HelperText>
    <Field.ErrorText :class="fieldStyles.ErrorText">Error Info</Field.ErrorText>
  </Field.Root>
</template>
