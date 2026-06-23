<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
</script>

<template>
  <div>
    <Field.Input placeholder="Email" />
    <Field.Textarea placeholder="Description" />
    <Field.Select>
      <option value="">Select a currency</option>
      <option value="usd">USD</option>
    </Field.Select>
  </div>
</template>
