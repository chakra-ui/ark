<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NumberInputInputBaseProps extends PolymorphicProps {}
export interface NumberInputInputProps
  extends NumberInputInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFieldContext } from '../field'
import { useNumberInputContext } from './use-number-input-context'

defineProps<NumberInputInputProps>()
const numberInput = useNumberInputContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input
    :aria-describedby="field?.ariaDescribedby"
    v-bind="numberInput.getInputProps()"
    :as-child="asChild"
  >
    <slot />
  </ark.input>
</template>
