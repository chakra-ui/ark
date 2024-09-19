<script setup lang="ts">
import { ref } from 'vue'
import { SignaturePad } from '../..'

const imageUrl = ref<string | null>(null)

const handleDrawEnd = async (details: SignaturePad.DrawEndDetails) => {
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
