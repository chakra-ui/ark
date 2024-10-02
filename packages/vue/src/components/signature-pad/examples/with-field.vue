<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { SignaturePad, type SignaturePadDrawEndDetails } from '@ark-ui/vue/signature-pad'
import { ref } from 'vue'

const imageUrl = ref('')

const handleDrawEnd = async (details: SignaturePadDrawEndDetails) => {
  imageUrl.value = await details.getDataUrl('image/png')
}
</script>

<template>
  <Field.Root>
    <SignaturePad.Root @draw-end="handleDrawEnd">
      <SignaturePad.Label>Label</SignaturePad.Label>
      <SignaturePad.Control>
        <SignaturePad.Segment />
        <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
        <SignaturePad.Guide />
      </SignaturePad.Control>
      <SignaturePad.HiddenInput :value="imageUrl" />
    </SignaturePad.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
</template>
