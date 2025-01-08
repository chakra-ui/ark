<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NumberInputIncrementTriggerBaseProps extends PolymorphicProps {}
export interface NumberInputIncrementTriggerProps
  extends NumberInputIncrementTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'
defineProps<NumberInputIncrementTriggerProps>()
const numberInput = useNumberInputContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="numberInput.getIncrementTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
