<script lang="ts">
import type { TriggerProps } from '@zag-js/tooltip'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
const tooltip = useTooltipContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="tooltip.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
