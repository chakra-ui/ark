<script setup lang="ts">
import type { TextareaHTMLAttributes } from 'vue'
import { Field } from '../'
const model = defineModel<TextareaHTMLAttributes['value']>()
</script>

<template>
  <Field.Root>
    <Field.Label>Label</Field.Label>
    <Field.Textarea v-model="model" />
    <Field.HelperText>Some additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
