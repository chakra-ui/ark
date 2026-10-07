<script lang="ts">
import type { DigitProps } from '@zag-js/number-flow'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NumberFlowDigitBaseProps extends DigitProps, PolymorphicProps {}
export interface NumberFlowDigitProps
  extends
    NumberFlowDigitBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import NumberFlowDigitTrack from './number-flow-digit-track.vue'
import { useNumberFlowContext } from './use-number-flow-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<NumberFlowDigitProps>()
const numberFlow = useNumberFlowContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="numberFlow.getDigitProps(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot><NumberFlowDigitTrack :segment="props.segment" /></slot>
    </template>
  </ark.span>
</template>
