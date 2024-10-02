<script setup lang="ts">
import { QrCode } from '@ark-ui/vue/qr-code'
</script>

<template>
  <QrCode.Root value="http://ark-ui.com">
    <QrCode.Frame>
      <QrCode.Pattern />
    </QrCode.Frame>
  </QrCode.Root>
</template>
