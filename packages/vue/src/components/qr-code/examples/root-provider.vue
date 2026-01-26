<script setup lang="ts">
import { QrCode, useQrCode } from '@ark-ui/vue/qr-code'
import styles from 'styles/qr-code.module.css'

const qrCode = useQrCode({ value: 'http://ark-ui.com' })
</script>

<template>
  <div class="stack">
    <QrCode.RootProvider :class="styles.Root" :value="qrCode">
      <QrCode.Frame :class="styles.Frame">
        <QrCode.Pattern :class="styles.Pattern" />
      </QrCode.Frame>
    </QrCode.RootProvider>
    <output>{{ qrCode.value }}</output>
  </div>
</template>
