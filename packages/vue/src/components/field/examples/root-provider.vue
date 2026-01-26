<script setup lang="ts">
import { Field, type UseFieldProps, useField } from '@ark-ui/vue/field'
import { computed, ref } from 'vue'
import styles from 'styles/field.module.css'
import button from 'styles/button.module.css'

const invalid = ref(false)
const fieldProps = computed<UseFieldProps>(() => ({
  invalid: invalid.value,
}))

const field = useField(fieldProps)
</script>

<template>
  <button :class="button.Root" style="margin-bottom: 1rem" @click="invalid = !invalid">Toggle Invalid</button>

  <Field.RootProvider :class="styles.Root" :value="field">
    <Field.Label :class="styles.Label">Label</Field.Label>
    <Field.Input :class="styles.Input" />
    <Field.HelperText :class="styles.HelperText">Some additional Info</Field.HelperText>
    <Field.ErrorText :class="styles.ErrorText">Error Info</Field.ErrorText>
  </Field.RootProvider>
</template>
