<script setup lang="ts">
import { QrCode, useQrCode } from '@ark-ui/vue/qr-code'

const qrCode = useQrCode({ value: 'http://ark-ui.com' })
</script>

<template>
  <button @click="qrCode.setValue('https://ark-ui.com')">Set Value</button>

  <QrCode.RootProvider :value="qrCode">
    <QrCode.Frame>
      <QrCode.Pattern />
    </QrCode.Frame>
  </QrCode.RootProvider>
</template>
