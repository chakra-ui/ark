<script lang="ts">
import type { DigitTrackProps } from '@zag-js/number-flow'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NumberFlowDigitTrackBaseProps extends DigitTrackProps, PolymorphicProps {}
export interface NumberFlowDigitTrackProps
  extends
    NumberFlowDigitTrackBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import NumberFlowDigitCell from './number-flow-digit-cell.vue'
import { useNumberFlowContext } from './use-number-flow-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<NumberFlowDigitTrackProps>()
const numberFlow = useNumberFlowContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="numberFlow.getDigitTrackProps(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot>
        <NumberFlowDigitCell
          v-for="cell in numberFlow.digitCells"
          :key="cell.index"
          :segment="props.segment"
          :cell="cell"
        />
      </slot>
    </template>
  </ark.span>
</template>
