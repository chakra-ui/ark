<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface TooltipArrowTipProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

defineProps<TooltipArrowTipProps>()
const tooltip = useTooltipContext()
</script>

<template>
  <ark.div v-bind="tooltip.arrowTipProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
