<script lang="ts">
import type { SVGAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface QrCodePatternProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    SVGAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useQrCodeContext } from './use-qr-code-context'

defineProps<QrCodePatternProps>()
const qrCode = useQrCodeContext()
</script>

<template>
  <ark.path v-bind="qrCode.getPatternProps()" :as-child="asChild">
    <slot />
  </ark.path>
</template>
