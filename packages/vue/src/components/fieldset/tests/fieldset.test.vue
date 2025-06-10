<script setup lang="ts">
import { Field, Fieldset, type FieldsetRootProps } from '../..'

const props = defineProps<FieldsetRootProps>()
</script>

<template>
  <Fieldset.Root v-bind="props">
    <Fieldset.Legend>Legend</Fieldset.Legend>
    <Fieldset.HelperText>Fieldset Helper Text</Fieldset.HelperText>
    <Fieldset.ErrorText>Fieldset Error Text</Fieldset.ErrorText>
    <Field.Root>
      <Field.Label>Label</Field.Label>
      <Field.Input />
      <Field.HelperText>Field Helper Text</Field.HelperText>
      <Field.ErrorText>Field Error Text</Field.ErrorText>
    </Field.Root>
  </Fieldset.Root>
</template>
