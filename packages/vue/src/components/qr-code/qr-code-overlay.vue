<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface QrCodeOverlayBaseProps extends PolymorphicProps {}
export interface QrCodeOverlayProps
  extends QrCodeOverlayBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

defineProps<QrCodeOverlayProps>()
const qrCode = useQrCodeContext()
</script>

<template>
  <ark.div v-bind="qrCode.getOverlayProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
