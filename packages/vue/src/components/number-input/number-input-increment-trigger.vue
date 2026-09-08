<script lang="ts">
import type { IncrementTriggerState } from '@zag-js/number-input'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface NumberInputIncrementTriggerState extends IncrementTriggerState {}
export interface NumberInputIncrementTriggerBaseProps extends PolymorphicProps {}
export interface NumberInputIncrementTriggerProps
  extends
    NumberInputIncrementTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useNumberInputContext } from './use-number-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
defineProps<NumberInputIncrementTriggerProps>()

defineSlots<PolymorphicSlots<NumberInputIncrementTriggerState>>()
const numberInput = useNumberInputContext()

useForwardExpose()
</script>

<template>
  <ark.button
    v-bind="numberInput.getIncrementTriggerProps()"
    :state="numberInput.getIncrementTriggerState()"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
