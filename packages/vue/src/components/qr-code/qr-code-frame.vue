<script lang="ts">
import type { SVGAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface QrCodeFrameBaseProps extends PolymorphicProps {}
export interface QrCodeFrameProps
  extends QrCodeFrameBaseProps,
    /**
     * @vue-ignore
     */
    SVGAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'
import { useForwardExpose } from '../../utils'

defineProps<QrCodeFrameProps>()
const qrCode = useQrCodeContext()

useForwardExpose()
</script>

<template>
  <ark.svg v-bind="qrCode.getFrameProps()" :as-child="asChild">
    <slot />
  </ark.svg>
</template>
