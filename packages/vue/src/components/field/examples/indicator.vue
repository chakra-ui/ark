<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import styles from 'styles/field.module.css'
</script>

<template>
  <Field.Root :class="styles.Root" required>
    <Field.Label :class="styles.Label">
      Username
      <Field.Indicator type="required">*</Field.Indicator>
    </Field.Label>
    <Field.Input :class="styles.Input" />
  </Field.Root>
</template>
