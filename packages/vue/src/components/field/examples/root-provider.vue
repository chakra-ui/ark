<script setup lang="ts">
import { Field, type UseFieldProps, useField } from '@ark-ui/vue/field'
import { computed, ref } from 'vue'

const invalid = ref(false)
const fieldProps = computed<UseFieldProps>(() => ({
  invalid: invalid.value,
}))

const field = useField(fieldProps)
</script>

<template>
  <button @click="invalid = !invalid">Toggle Invalid</button>

  <Field.RootProvider :value="field">
    <Field.Label>Label</Field.Label>
    <Field.Input />
    <Field.HelperText>Some additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.RootProvider>
</template>
