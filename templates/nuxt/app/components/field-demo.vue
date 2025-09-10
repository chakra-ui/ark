<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
</script>

<template>
  <Field.Root>
    <Field.Label>Label</Field.Label>
    <Field.Input />
    <Field.HelperText>Some additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
