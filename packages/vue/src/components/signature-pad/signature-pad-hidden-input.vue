<script lang="ts">
import type { HiddenInputProps } from '@zag-js/signature-pad'
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SignaturePadHiddenInputBaseProps extends HiddenInputProps, PolymorphicProps {}
export interface SignaturePadHiddenInputProps
  extends SignaturePadHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    Omit<InputHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useSignaturePadContext } from './use-signature-pad-context'
import { useFieldContext } from '../field'

const props = defineProps<SignaturePadHiddenInputProps>()
const signaturePad = useSignaturePadContext()
const field = useFieldContext()
</script>

<template>
  <ark.input
    :aria-describedby="field?.ariaDescribedby"
    v-bind="signaturePad.getHiddenInputProps(props)"
    :as-child="asChild"
  >
    <slot />
  </ark.input>
</template>
