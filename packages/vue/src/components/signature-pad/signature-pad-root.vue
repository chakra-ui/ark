<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './signature-pad.types.ts'

export interface SignaturePadRootBaseProps extends RootProps, PolymorphicProps {}
export interface SignaturePadRootProps
  extends
    SignaturePadRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface SignaturePadRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useSignaturePad } from './use-signature-pad.ts'
import { SignaturePadProvider } from './use-signature-pad-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<SignaturePadRootBaseProps>(), {
  readOnly: undefined,
  disabled: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<SignaturePadRootEmits>()

const signaturepad = useSignaturePad(props, emits)
SignaturePadProvider(signaturepad)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="signaturepad.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
