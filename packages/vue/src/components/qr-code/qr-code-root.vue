<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './qr-code.types'

export interface QrCodeRootBaseProps extends RootProps, PolymorphicProps {}
export interface QrCodeRootProps
  extends QrCodeRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface QrCodeRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useQrCode } from './use-qr-code'
import { QrCodeProvider } from './use-qr-code-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<QrCodeRootProps>()
const qrCode = useQrCode(props)

QrCodeProvider(qrCode)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="qrCode.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
