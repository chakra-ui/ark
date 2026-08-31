<script setup lang="ts">
import { SignaturePad } from '@ark-ui/vue/signature-pad'
import { RotateCcwIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/signature-pad.module.css'

const paths = ref<string[]>([])
</script>

<template>
  <div class="stack">
    <output>paths: {{ paths.length }}</output>
    <SignaturePad.Root :class="styles.Root" v-model:paths="paths">
      <SignaturePad.Label :class="styles.Label">Sign below</SignaturePad.Label>
      <SignaturePad.Control :class="styles.Control">
        <SignaturePad.Segment :class="styles.Segment" />
        <SignaturePad.ClearTrigger :class="styles.ClearTrigger">
          <RotateCcwIcon />
        </SignaturePad.ClearTrigger>
        <SignaturePad.Guide :class="styles.Guide" />
      </SignaturePad.Control>
    </SignaturePad.Root>
    <button :class="button.Root" @click="paths = []">Clear</button>
  </div>
</template>
