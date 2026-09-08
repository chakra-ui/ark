<script lang="ts">
import type { InputState } from '@zag-js/number-input'
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface NumberInputInputState extends InputState {}
export interface NumberInputInputBaseProps extends PolymorphicProps {}
export interface NumberInputInputProps
  extends
    NumberInputInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useNumberInputContext } from './use-number-input-context.ts'
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<NumberInputInputProps>()

defineSlots<PolymorphicSlots<NumberInputInputState>>()
const numberInput = useNumberInputContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input
    :aria-describedby="field?.ariaDescribedby"
    v-bind="numberInput.getInputProps()"
    :state="numberInput.getInputState()"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.input>
</template>
