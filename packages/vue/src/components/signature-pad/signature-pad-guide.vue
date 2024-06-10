<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SignaturePadGuideProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

defineProps<SignaturePadGuideProps>()
const signaturePad = useSignaturePadContext()
</script>

<template>
  <ark.div v-bind="signaturePad.getGuideProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
