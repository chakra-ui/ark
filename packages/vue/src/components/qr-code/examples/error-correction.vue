<script setup lang="ts">
import { QrCode, type QrCodeGenerateOptions } from '@ark-ui/vue/qr-code'
import { ref } from 'vue'

const encoding = ref<QrCodeGenerateOptions>({ ecc: 'H' })
</script>

<template>
  <QrCode.Root defaultValue="http://ark-ui.com" :encoding="encoding">
    <QrCode.Frame>
      <QrCode.Pattern />
    </QrCode.Frame>
  </QrCode.Root>
</template>
