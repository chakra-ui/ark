<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
</script>

<template>
  <Field.Root required>
    <Field.Label>
      Label
      <Field.RequiredIndicator>*</Field.RequiredIndicator>
    </Field.Label>
    <Field.Input />
    <Field.HelperText>This field is required</Field.HelperText>
  </Field.Root>
</template>
