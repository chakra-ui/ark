<script lang="ts">
import type { SVGAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface QrCodeFrameBaseProps extends PolymorphicProps {}
export interface QrCodeFrameProps
  extends
    QrCodeFrameBaseProps,
    /**
     * @vue-ignore
     */
    SVGAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useQrCodeContext } from './use-qr-code-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<QrCodeFrameProps>()
const qrCode = useQrCodeContext()

useForwardExpose()
</script>

<template>
  <ark.svg v-bind="qrCode.getFrameProps()" :as-child="asChild">
    <slot />
  </ark.svg>
</template>
