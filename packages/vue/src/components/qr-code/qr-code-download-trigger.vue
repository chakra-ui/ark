<script lang="ts">
import type { DownloadTriggerProps } from '@zag-js/qr-code'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface QrCodeDownloadTriggerBaseProps extends DownloadTriggerProps, PolymorphicProps {}
export interface QrCodeDownloadTriggerProps
  extends
    QrCodeDownloadTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useQrCodeContext } from './use-qr-code-context.ts'

const props = defineProps<QrCodeDownloadTriggerProps>()
const qrCode = useQrCodeContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="qrCode.getDownloadTriggerProps(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
