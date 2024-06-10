<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './signature-pad.types'

export interface SignaturePadRootProps
  extends RootProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface SignaturePadRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSignaturePad } from './use-signature-pad'
import { SignaturePadProvider } from './use-signature-pad-context'

const props = defineProps<SignaturePadRootProps>()
const emits = defineEmits<SignaturePadRootEmits>()

const signaturepad = useSignaturePad(props, emits)
SignaturePadProvider(signaturepad)
</script>

<template>
  <ark.div v-bind="signaturepad.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
