<script setup lang="ts">
import { Field } from '../..'
</script>

<template>
  <Field.Root invalid>
    <Field.Label>Label</Field.Label>
    <Field.Input />
    <Field.HelperText>Some additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
