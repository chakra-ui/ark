<script setup lang="ts">
import { Field, type FieldRootProps } from '../../field/index.ts'
import { Switch } from '../index.ts'

defineProps<FieldRootProps>()
</script>

<template>
  <Field.Root v-bind="$props">
    <Switch.Root>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
