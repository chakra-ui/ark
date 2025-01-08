<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
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
      <Checkbox.Root>
        <Checkbox.Label>Checkbox</Checkbox.Label>
        <Checkbox.Control>
          <Checkbox.Indicator>✔️</Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
      <Field.HelperText>Field Heler Text</Field.HelperText>
      <Field.ErrorText>Field Error Text</Field.ErrorText>
    </Field.Root>
  </Fieldset.Root>
</template>
