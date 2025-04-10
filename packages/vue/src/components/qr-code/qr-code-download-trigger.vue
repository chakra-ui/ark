<script lang="ts">
import type { DownloadTriggerProps } from '@zag-js/qr-code'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface QrCodeDownloadTriggerBaseProps extends DownloadTriggerProps, PolymorphicProps {}
export interface QrCodeDownloadTriggerProps
  extends QrCodeDownloadTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

const props = defineProps<QrCodeDownloadTriggerProps>()
const qrCode = useQrCodeContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="qrCode.getDownloadTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
