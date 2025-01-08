<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PinInputHiddenInputBaseProps extends PolymorphicProps {}
export interface PinInputHiddenInputProps
  extends PinInputHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFieldContext } from '../field'
import { usePinInputContext } from './use-pin-input-context'

defineProps<PinInputHiddenInputProps>()

const pinInput = usePinInputContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input
    :aria-describedby="field?.ariaDescribedby"
    v-bind="pinInput.getHiddenInputProps()"
    :as-child="asChild"
  >
    <slot />
  </ark.input>
</template>
