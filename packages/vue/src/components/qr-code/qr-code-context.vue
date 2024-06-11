<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseQrCodeContext } from './use-qr-code-context'

export interface QrCodeContextProps
  extends SlotsType<{
    default: UnwrapRef<UseQrCodeContext>
  }> {}
</script>

<script setup lang="ts">
import { useQrCodeContext } from './use-qr-code-context'

const qrCode = useQrCodeContext()

defineSlots<{
  default(qrCode: UnwrapRef<UseQrCodeContext>): unknown
}>()
</script>

<template>
  <slot v-bind="qrCode"></slot>
</template>
