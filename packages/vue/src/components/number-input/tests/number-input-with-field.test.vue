<script setup lang="ts">
import { Field, type FieldRootProps } from '@ark-ui/vue/field'
import { NumberInput } from '@ark-ui/vue/number-input'

defineProps<FieldRootProps>()
</script>

<template>
  <Field.Root v-bind="$props">
    <NumberInput.Root>
      <NumberInput.Label>Label</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.Input />
        <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
      </NumberInput.Control>
    </NumberInput.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
