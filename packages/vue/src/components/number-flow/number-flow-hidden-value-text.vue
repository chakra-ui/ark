<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NumberFlowHiddenValueTextBaseProps extends PolymorphicProps {}
export interface NumberFlowHiddenValueTextProps
  extends
    NumberFlowHiddenValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useNumberFlowContext } from './use-number-flow-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<NumberFlowHiddenValueTextProps>()
const numberFlow = useNumberFlowContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="numberFlow.getValueTextProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot>{{ numberFlow.announcedValueText }}</slot>
    </template>
  </ark.span>
</template>
