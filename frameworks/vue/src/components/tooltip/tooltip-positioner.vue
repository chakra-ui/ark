<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface TooltipPositionerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { useRenderStrategyContext } from '../../utils/use-render-strategy'
import { Presence } from '../presence'
import { useTooltipContext } from './use-tooltip-context'

defineProps<TooltipPositionerProps>()
const tooltip = useTooltipContext()
const renderStrategy = useRenderStrategyContext()
</script>

<template>
  <Presence
    v-bind="tooltip.positionerProps"
    :present="tooltip.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
