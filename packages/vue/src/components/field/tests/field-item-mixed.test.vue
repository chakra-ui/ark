<script setup lang="ts">
import { Field } from '../..'
</script>

<template>
  <Field.Root>
    <Field.Label>Amount</Field.Label>
    <Field.Item value="currency">
      <Field.Select data-testid="currency-select">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </Field.Select>
    </Field.Item>
    <Field.Input data-testid="amount-input" />
    <Field.HelperText>Enter the amount</Field.HelperText>
  </Field.Root>
</template>
