<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NumberInputLabelBaseProps extends PolymorphicProps {}
export interface NumberInputLabelProps
  extends NumberInputLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'
import { useForwardExpose } from '../../utils'

defineProps<NumberInputLabelProps>()
const numberInput = useNumberInputContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="numberInput.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
