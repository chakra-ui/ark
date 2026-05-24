<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './qr-code.types.ts'

export interface QrCodeRootBaseProps extends RootProps, PolymorphicProps {}
export interface QrCodeRootProps
  extends
    QrCodeRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface QrCodeRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useQrCode } from './use-qr-code.ts'
import { QrCodeProvider } from './use-qr-code-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

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
