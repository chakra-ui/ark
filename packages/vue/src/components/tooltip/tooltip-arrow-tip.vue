<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TooltipArrowTipProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

defineProps<TooltipArrowTipProps>()
const tooltip = useTooltipContext()
</script>

<template>
  <ark.div v-bind="tooltip.getArrowTipProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
