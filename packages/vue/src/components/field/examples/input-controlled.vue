<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { ref } from 'vue'

const model = ref('Input is controlled')
</script>

<template>
  <span>Input text: {{ model }}</span>
  <Field.Root>
    <Field.Label>Label</Field.Label>
    <Field.Input v-model="model" />
    <Field.HelperText>Some additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
