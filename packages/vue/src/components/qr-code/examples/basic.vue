<script setup lang="ts">
import { QrCode } from '@ark-ui/vue/qr-code'
</script>

<template>
  <QrCode.Root defalutValue="http://ark-ui.com">
    <QrCode.Frame>
      <QrCode.Pattern />
    </QrCode.Frame>
    <QrCode.DownloadTrigger fileName="qr-code.png" mimeType="image/png">
      Download
    </QrCode.DownloadTrigger>
  </QrCode.Root>
</template>
