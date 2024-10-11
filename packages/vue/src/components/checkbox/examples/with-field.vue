<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { Field } from '@ark-ui/vue/field'
import { CheckIcon } from './icons'
</script>

<template>
  <Field.Root>
    <Checkbox.Root>
      <Checkbox.Label>Label</Checkbox.Label>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
        <Checkbox.Indicator indeterminate>
          <MinusIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
