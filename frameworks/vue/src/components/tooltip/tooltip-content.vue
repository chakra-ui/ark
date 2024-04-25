<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface TooltipContentProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

defineProps<TooltipContentProps>()
const tooltip = useTooltipContext()
</script>

<template>
  <ark.div v-bind="tooltip.contentProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
