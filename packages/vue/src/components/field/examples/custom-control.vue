<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
</script>

<template>
  <Field.Root invalid>
    <Field.Label>Any Control</Field.Label>
    <Field.Context v-slot="field">
      <input v-bind="field.getInputProps()" />
    </Field.Context>
    <Field.HelperText>Uses getControlProps() for maximum flexibility</Field.HelperText>
    <Field.ErrorText>This field has an error</Field.ErrorText>
  </Field.Root>
</template>
