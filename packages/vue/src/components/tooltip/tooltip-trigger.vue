<script lang="ts">
import type { TriggerProps, TriggerState } from '@zag-js/tooltip'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface TooltipTriggerState extends TriggerState {}
export interface TooltipTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface TooltipTriggerProps
  extends
    TooltipTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTooltipContext } from './use-tooltip-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<TooltipTriggerProps>()

defineSlots<PolymorphicSlots<TooltipTriggerState>>()
const tooltip = useTooltipContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="tooltip.getTriggerProps(props)" :state="tooltip.getTriggerState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
