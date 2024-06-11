<script setup lang="ts">
import { ref } from 'vue'
import { QrCode } from '../..'

const encoding = ref({ ecc: 'H' })
</script>

<template>
  <QrCode.Root value="http://ark-ui.com" :encoding="encoding">
    <QrCode.Frame>
      <QrCode.Pattern />
    </QrCode.Frame>
    <QrCode.Overlay>
      <img src="https://ark-ui.com/icon-192.png" alt="Ark UI Logo" />
    </QrCode.Overlay>
  </QrCode.Root>
</template>
