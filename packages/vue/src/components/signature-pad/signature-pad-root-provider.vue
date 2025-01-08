<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseSignaturePadReturn } from './use-signature-pad'

interface RootProviderProps {
  value: UnwrapRef<UseSignaturePadReturn>
}

export interface SignaturePadRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SignaturePadRootProviderProps
  extends SignaturePadRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
iimport { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { SignaturePadProvider } from './use-signature-pad-context'
const props = defineProps<SignaturePadRootProviderProps>()
const signaturePad = computed(() => props.value)

SignaturePadProvider(signaturePad)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="signaturePad.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
