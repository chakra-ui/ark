<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './signature-pad.types'

export interface SignaturePadRootBaseProps extends RootProps, PolymorphicProps {}
export interface SignaturePadRootProps
  extends SignaturePadRootBaseProps,
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
import { useForwardExpose } from '../../utils'

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
