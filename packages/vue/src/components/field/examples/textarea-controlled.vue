<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { ref } from 'vue'

const model = ref(['This is some text', 'then more text'])
</script>

<template>
  <span>Textarea value: {{ model }}</span>
  <Field.Root>
    <Field.Label>Label</Field.Label>
    <Field.Textarea v-model="model" />
    <Field.HelperText>Some additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
