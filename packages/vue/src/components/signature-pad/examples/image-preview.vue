<script setup lang="ts">
import { SignaturePad, type SignaturePadDrawEndDetails } from '@ark-ui/vue/signature-pad'
import { ref } from 'vue'

const imageUrl = ref<string | null>(null)

const handleDrawEnd = async (details: SignaturePadDrawEndDetails) => {
  imageUrl.value = await details.getDataUrl('image/png')
}
</script>

<template>
  <SignaturePad.Root @draw-end="handleDrawEnd">
    <SignaturePad.Label>Sign below</SignaturePad.Label>
    <SignaturePad.Control>
      <SignaturePad.Segment fill="orange" />
      <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
      <SignaturePad.Guide />
    </SignaturePad.Control>
  </SignaturePad.Root>
  <img v-if="imageUrl" :src="imageUrl" alt="Signature preview" />
</template>
