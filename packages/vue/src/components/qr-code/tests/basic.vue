<script setup lang="ts">
import { QrCode } from '../..'
</script>

<template>
  <QrCode.Root value="http://ark-ui.com">
    <QrCode.Frame>
      <QrCode.Pattern />
    </QrCode.Frame>
    <QrCode.Overlay>
      <img src="https://ark-ui.com/icon-192.png" alt="" />
    </QrCode.Overlay>
    <QrCode.DownloadTrigger fileName="qr-code.png" mimeType="image/png">
      Download
    </QrCode.DownloadTrigger>
  </QrCode.Root>
</template>
