<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NumberInputDecrementTriggerBaseProps extends PolymorphicProps {}
export interface NumberInputDecrementTriggerProps
  extends NumberInputDecrementTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

defineProps<NumberInputDecrementTriggerProps>()
const numberInput = useNumberInputContext()
</script>

<template>
  <ark.button v-bind="numberInput.getDecrementTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
