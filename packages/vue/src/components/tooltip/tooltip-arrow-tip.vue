<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface TooltipArrowTipProps extends PolymorphicProps {}
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
