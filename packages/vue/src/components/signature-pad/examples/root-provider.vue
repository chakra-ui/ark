<script setup lang="ts">
import { SignaturePad, useSignaturePad } from '@ark-ui/vue/signature-pad'

const signaturePad = useSignaturePad()
</script>

<template>
  <button @click="signaturePad.clear()">Clear</button>

  <SignaturePad.RootProvider :value="signaturePad">
    <SignaturePad.Label>Sign below</SignaturePad.Label>
    <SignaturePad.Control>
      <SignaturePad.Segment />
      <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
      <SignaturePad.Guide />
    </SignaturePad.Control>
  </SignaturePad.RootProvider>
</template>
