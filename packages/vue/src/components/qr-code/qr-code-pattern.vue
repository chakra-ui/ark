<script lang="ts">
import type { SVGAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface QrCodePatternBaseProps extends PolymorphicProps {}
export interface QrCodePatternProps
  extends QrCodePatternBaseProps,
    /**
     * @vue-ignore
     */
    SVGAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'
import { useForwardExpose } from '../../utils'

defineProps<QrCodePatternProps>()
const qrCode = useQrCodeContext()

useForwardExpose()
</script>

<template>
  <ark.path v-bind="qrCode.getPatternProps()" :as-child="asChild">
    <slot />
  </ark.path>
</template>
