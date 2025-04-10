<script setup lang="ts">
import { QrCode } from '@ark-ui/vue/qr-code'
</script>

<template>
  <QrCode.Root defaultValue="http://ark-ui.com">
    <QrCode.Frame>
      <QrCode.Pattern />
    </QrCode.Frame>
    <QrCode.Overlay>
      <img src="https://ark-ui.com/icon-192.png" alt="Ark UI Logo" />
    </QrCode.Overlay>
  </QrCode.Root>
</template>
