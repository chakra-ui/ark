<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SignaturePadClearTriggerProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'

defineProps<SignaturePadClearTriggerProps>()
const signaturePad = useSignaturePadContext()
</script>

<template>
  <ark.button v-bind="signaturePad.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
