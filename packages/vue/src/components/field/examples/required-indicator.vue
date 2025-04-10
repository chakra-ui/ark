<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
</script>

<template>
  <Field.Root required>
    <Field.Label>
      Username
      <Field.RequiredIndicator />
    </Field.Label>
    <Field.Input placeholder="Enter your username" />
  </Field.Root>
</template>
