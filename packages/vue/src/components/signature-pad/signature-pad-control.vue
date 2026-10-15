<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SignaturePadControlBaseProps extends PolymorphicProps {}
export interface SignaturePadControlProps
  extends
    SignaturePadControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSignaturePadContext } from './use-signature-pad-context.ts'
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SignaturePadControlProps>()
const signaturePad = useSignaturePadContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.div :aria-describedby="field?.ariaDescribedby" v-bind="signaturePad.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
