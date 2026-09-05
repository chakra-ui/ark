<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NumberInputDecrementTriggerBaseProps extends PolymorphicProps {}
export interface NumberInputDecrementTriggerProps
  extends
    NumberInputDecrementTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useNumberInputContext } from './use-number-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<NumberInputDecrementTriggerProps>()
const numberInput = useNumberInputContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="numberInput.getDecrementTriggerProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
