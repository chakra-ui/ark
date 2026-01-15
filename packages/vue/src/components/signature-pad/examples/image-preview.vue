<script setup lang="ts">
import { SignaturePad, type SignaturePadDrawEndDetails } from '@ark-ui/vue/signature-pad'
import { RotateCcwIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/signature-pad.module.css'

const imageUrl = ref('')

const handleDrawEnd = async (details: SignaturePadDrawEndDetails) => {
  imageUrl.value = await details.getDataUrl('image/png')
}
</script>

<template>
  <div class="stack">
    <SignaturePad.Root :class="styles.Root" @draw-end="handleDrawEnd">
      <SignaturePad.Label :class="styles.Label">Sign below</SignaturePad.Label>
      <SignaturePad.Control :class="styles.Control">
        <SignaturePad.Segment :class="styles.Segment" />
        <SignaturePad.ClearTrigger :class="styles.ClearTrigger">
          <RotateCcwIcon />
        </SignaturePad.ClearTrigger>
        <SignaturePad.Guide :class="styles.Guide" />
      </SignaturePad.Control>
    </SignaturePad.Root>

    <div class="stack">
      <span>Image Preview</span>
      <img v-if="imageUrl" :src="imageUrl" alt="Signature" :class="styles.Image" />
    </div>
  </div>
</template>
