<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NumberInputValueTextBaseProps extends PolymorphicProps {}
export interface NumberInputValueTextProps
  extends
    NumberInputValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useNumberInputContext } from './use-number-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<NumberInputValueTextProps>()
const numberInput = useNumberInputContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="numberInput.getValueTextProps()" :as-child="asChild">
    <slot />
  </ark.span>
</template>
