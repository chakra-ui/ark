<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
</script>

<template>
  <Field.Root invalid target="amount">
    <Field.Label>Amount</Field.Label>
    <Field.Item value="amount">
      <Field.Input data-testid="amount-input" />
    </Field.Item>
    <Field.ErrorText>Invalid amount</Field.ErrorText>
  </Field.Root>
</template>
