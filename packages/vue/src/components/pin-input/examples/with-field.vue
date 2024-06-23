<script setup lang="ts">
import { Field, PinInput } from '../..'
</script>

<template>
  <Field.Root>
    <PinInput.Root>
      <PinInput.Label>Label</PinInput.Label>
      <PinInput.Control>
        <PinInput.Input v-for="id in [0, 1, 2]" :key="id" :index="id" />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
