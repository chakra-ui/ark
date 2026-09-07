<script lang="ts">
import type { RootState } from '@zag-js/signature-pad'
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { UseSignaturePadReturn } from './use-signature-pad.ts'

interface RootProviderProps {
  value: UnwrapRef<UseSignaturePadReturn>
}

export interface SignaturePadRootProviderState extends RootState {}
export interface SignaturePadRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SignaturePadRootProviderProps
  extends
    SignaturePadRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { SignaturePadProvider } from './use-signature-pad-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<SignaturePadRootProviderProps>()

defineSlots<PolymorphicSlots<SignaturePadRootProviderState>>()
const signaturePad = computed(() => props.value)

SignaturePadProvider(signaturePad)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="signaturePad.getRootProps()" :state="signaturePad.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
