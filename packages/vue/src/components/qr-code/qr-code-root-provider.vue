<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseQrCodeReturn } from './use-qr-code'

interface RootProviderProps {
  value: UnwrapRef<UseQrCodeReturn>
}

export interface QrCodeRootProviderProps
  extends RootProviderProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { QrCodeProvider } from './use-qr-code-context'

const props = defineProps<QrCodeRootProviderProps>()
const qrCode = computed(() => props.value)

QrCodeProvider(qrCode)
</script>

<template>
  <ark.div v-bind="qrCode.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
