<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SignaturePadControlProps
  extends PolymorphicProps,
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
