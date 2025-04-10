<script setup lang="ts">
import { Field } from '../..'
const model = defineModel()
</script>

<template>
  <Field.Root invalid required>
    <Field.Label>
      Label
      <Field.RequiredIndicator />
    </Field.Label>
    <Field.Input v-model="model" />
    <Field.HelperText>Some additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
