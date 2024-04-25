<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface TooltipArrowProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

defineProps<TooltipArrowProps>()
const tooltip = useTooltipContext()
</script>

<template>
  <ark.div v-bind="tooltip.arrowProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
