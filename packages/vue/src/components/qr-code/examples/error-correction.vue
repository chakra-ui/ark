<script setup lang="ts">
import { ref } from 'vue'
import { QrCode } from '../..'

const encoding = ref<QrCode.GenerateOptions>({ ecc: 'H' })
</script>

<template>
  <QrCode.Root value="http://ark-ui.com" :encoding="encoding">
    <QrCode.Frame>
      <QrCode.Pattern />
    </QrCode.Frame>
  </QrCode.Root>
</template>
