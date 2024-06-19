<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TooltipContentBaseProps extends PolymorphicProps {}
export interface TooltipContentProps
  extends TooltipContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

defineProps<TooltipContentProps>()
const tooltip = useTooltipContext()
</script>

<template>
  <ark.div v-bind="tooltip.getContentProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
