<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TooltipArrowTipBaseProps extends PolymorphicProps {}
export interface TooltipArrowTipProps
  extends
    TooltipArrowTipBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTooltipContext } from './use-tooltip-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TooltipArrowTipProps>()
const tooltip = useTooltipContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tooltip.getArrowTipProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
