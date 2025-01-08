<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SignaturePadGuideBaseProps extends PolymorphicProps {}
export interface SignaturePadGuideProps
  extends SignaturePadGuideBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

defineProps<SignaturePadGuideProps>()
const signaturePad = useSignaturePadContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="signaturePad.getGuideProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
