<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { Fieldset, useFieldset } from '@ark-ui/vue/fieldset'
import field from 'styles/field.module.css'
import styles from 'styles/fieldset.module.css'

const fieldset = useFieldset()
</script>

<template>
  <Fieldset.RootProvider :class="styles.Root" :value="fieldset">
    <Fieldset.Legend :class="styles.Legend">Contact Details</Fieldset.Legend>

    <Field.Root :class="field.Root">
      <Field.Label :class="field.Label">Name</Field.Label>
      <Field.Input :class="field.Input" placeholder="John Doe" />
    </Field.Root>

    <Field.Root :class="field.Root">
      <Field.Label :class="field.Label">Email</Field.Label>
      <Field.Input :class="field.Input" type="email" placeholder="john@example.com" />
    </Field.Root>
  </Fieldset.RootProvider>
</template>
