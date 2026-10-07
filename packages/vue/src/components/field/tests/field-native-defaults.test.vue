<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
</script>

<template>
  <form data-testid="form">
    <Field.Root>
      <Field.Input name="code" :defaultValue="'MAPS'" />
    </Field.Root>
    <Field.Root>
      <Field.Textarea name="notes" :defaultValue="'Hello'" />
    </Field.Root>
    <Field.Root>
      <Field.Select name="country">
        <option value="ca">Canada</option>
        <option value="us" selected>United States</option>
      </Field.Select>
    </Field.Root>
  </form>
</template>
