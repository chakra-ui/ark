<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TooltipPositionerProps
  extends PolymorphicProps,
    /* @vue-ignore */ HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { Presence } from '../presence'
import { useTooltipContext } from './use-tooltip-context'

defineProps<TooltipPositionerProps>()
const tooltip = useTooltipContext()
const renderStrategy = useRenderStrategyProps()
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
