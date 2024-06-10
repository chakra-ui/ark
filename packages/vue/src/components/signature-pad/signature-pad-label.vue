<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SignaturePadLabelProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

defineProps<SignaturePadLabelProps>()
const signaturePad = useSignaturePadContext()
</script>

<template>
  <ark.label v-bind="signaturePad.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
