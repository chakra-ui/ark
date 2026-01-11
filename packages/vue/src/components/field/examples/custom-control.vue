<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import styles from 'styles/field.module.css'
</script>

<template>
  <Field.Root :class="styles.Root" invalid>
    <Field.Label :class="styles.Label">Any Control</Field.Label>
    <Field.Context v-slot="field">
      <input v-bind="field.getInputProps()" />
    </Field.Context>
    <Field.HelperText :class="styles.HelperText">Uses getInputProps() for maximum flexibility</Field.HelperText>
    <Field.ErrorText :class="styles.ErrorText">This field has an error</Field.ErrorText>
  </Field.Root>
</template>
