<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { NumberInput } from '@ark-ui/vue/number-input' /* PartiallyEnd: #3632/scriptSetup.vue */
import { NumberInput } from '@ark-ui/vue/number-input'
</script>

<template>
  <Field.Root>
    <NumberInput.Root>
      <NumberInput.Label>Label</NumberInput.Label>
      <NumberInput.Input />
      <NumberInput.Control>
        <NumberInput.DecrementTrigger>-1</NumberInput.DecrementTrigger>
        <NumberInput.IncrementTrigger>+1</NumberInput.IncrementTrigger>
      </NumberInput.Control>
    </NumberInput.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
