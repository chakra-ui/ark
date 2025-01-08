<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { Fieldset } from '@ark-ui/vue/fieldset' /* PartiallyEnd: #3632/scriptSetup.vue */
import { Fieldset } from '@ark-ui/vue/fieldset'
</script>

<template>
  <Fieldset.Root>
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
