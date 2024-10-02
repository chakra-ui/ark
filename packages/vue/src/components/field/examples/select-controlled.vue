<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { ref } from 'vue'

const model = ref('3')
</script>

<template>
  <span>Selected: Option {{ model }}</span>
  <Field.Root>
    <Field.Label>Label</Field.Label>
    <Field.Select v-model="model">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Field.Select>
    <Field.HelperText>Some additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
