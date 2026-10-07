<script lang="ts">
import type { DigitCellProps } from '@zag-js/number-flow'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NumberFlowDigitCellBaseProps extends DigitCellProps, PolymorphicProps {}
export interface NumberFlowDigitCellProps
  extends
    NumberFlowDigitCellBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useNumberFlowContext } from './use-number-flow-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<NumberFlowDigitCellProps>()
const numberFlow = useNumberFlowContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="numberFlow.getDigitCellProps(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot>{{ props.cell.glyph }}</slot>
    </template>
  </ark.span>
</template>
