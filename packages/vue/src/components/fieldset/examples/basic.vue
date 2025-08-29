<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { Fieldset } from '@ark-ui/vue/fieldset'
</script>

<template>
  <Fieldset.Root>
    <Fieldset.Legend>Legend</Fieldset.Legend>
    <Field.Input type="text" />
    <Fieldset.HelperText>Helper text</Fieldset.HelperText>
    <Fieldset.ErrorText>Error text</Fieldset.ErrorText>
  </Fieldset.Root>
</template>
