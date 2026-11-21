<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { Fieldset } from '@ark-ui/vue/fieldset'
</script>

<template>
  <Fieldset.Root disabled>
    <Fieldset.Legend>Legend</Fieldset.Legend>
    <Field.Root data-testid="field">
      <Field.Label>Label</Field.Label>
    </Field.Root>
  </Fieldset.Root>
</template>
