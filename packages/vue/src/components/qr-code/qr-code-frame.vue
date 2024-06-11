<script lang="ts">
import type { SVGAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface QrCodeFrameProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    SVGAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

defineProps<QrCodeFrameProps>()
const qrCode = useQrCodeContext()
</script>

<template>
  <ark.svg v-bind="qrCode.getFrameProps()" :as-child="asChild">
    <slot />
  </ark.svg>
</template>
