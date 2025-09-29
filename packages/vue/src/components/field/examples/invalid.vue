<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
</script>

<template>
  <Field.Root invalid>
    <Field.Label>Label</Field.Label>
    <Field.Input />
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
