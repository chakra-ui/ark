<script setup lang="ts">
import { Field, type FieldRootProps } from '@ark-ui/vue/field'
import { SignaturePad } from '@ark-ui/vue/signature-pad'

defineProps<FieldRootProps>()
</script>

<template>
  <Field.Root v-bind="$props">
    <SignaturePad.Root>
      <SignaturePad.Label>Label</SignaturePad.Label>
      <SignaturePad.Control>
        <SignaturePad.Segment />
        <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
        <SignaturePad.Guide />
      </SignaturePad.Control>
      <SignaturePad.HiddenInput value="" />
    </SignaturePad.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
