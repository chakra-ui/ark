<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SignaturePadControlBaseProps extends PolymorphicProps {}
export interface SignaturePadControlProps
  extends SignaturePadControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

defineProps<SignaturePadControlProps>()
const signaturePad = useSignaturePadContext()
</script>

<template>
  <ark.div role="application" v-bind="signaturePad.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
