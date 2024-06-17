<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TooltipArrowBaseProps extends PolymorphicProps {}
export interface TooltipArrowProps
  extends TooltipArrowBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

defineProps<TooltipArrowProps>()
const tooltip = useTooltipContext()
</script>

<template>
  <ark.div v-bind="tooltip.getArrowProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
