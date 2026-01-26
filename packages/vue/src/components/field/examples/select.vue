<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import styles from 'styles/field.module.css'
</script>

<template>
  <Field.Root :class="styles.Root">
    <Field.Label :class="styles.Label">Label</Field.Label>
    <Field.Select :class="styles.Select">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Field.Select>
    <Field.HelperText :class="styles.HelperText">Some additional Info</Field.HelperText>
    <Field.ErrorText :class="styles.ErrorText">Error Info</Field.ErrorText>
  </Field.Root>
</template>
