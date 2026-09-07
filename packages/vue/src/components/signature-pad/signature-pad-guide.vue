<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SignaturePadGuideBaseProps extends PolymorphicProps {}
export interface SignaturePadGuideProps
  extends
    SignaturePadGuideBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSignaturePadContext } from './use-signature-pad-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SignaturePadGuideProps>()
const signaturePad = useSignaturePadContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="signaturePad.getGuideProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
