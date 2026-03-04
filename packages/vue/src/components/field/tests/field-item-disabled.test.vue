<script setup lang="ts">
import { Field } from '../..'
</script>

<template>
  <Field.Root disabled target="amount">
    <Field.Label>Amount</Field.Label>
    <Field.Item value="currency">
      <Field.Select data-testid="currency-select">
        <option value="USD">USD</option>
      </Field.Select>
    </Field.Item>
    <Field.Item value="amount">
      <Field.Input data-testid="amount-input" />
    </Field.Item>
  </Field.Root>
</template>
