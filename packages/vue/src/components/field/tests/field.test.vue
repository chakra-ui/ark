<script setup lang="ts">
import { Field, type FieldRootProps } from '../..'

const props = defineProps<FieldRootProps>()
const model = defineModel()
</script>

<template>
  <Field.Root v-bind="props">
    <Field.Label>
      Label
      <Field.RequiredIndicator />
    </Field.Label>
    <Field.Input v-model="model" />
    <Field.HelperText>Some additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
