<script setup lang="ts">
import { Field, type FieldRootProps } from '@ark-ui/vue/field'

defineProps<{ ids?: FieldRootProps['ids'] }>()
</script>

<template>
  <Field.Root target="amount" :ids="ids">
    <Field.Label>Amount</Field.Label>
    <Field.Item value="currency">
      <Field.Select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </Field.Select>
    </Field.Item>
    <Field.Item value="amount">
      <Field.Input />
    </Field.Item>
    <Field.HelperText>Enter the amount</Field.HelperText>
  </Field.Root>
</template>
