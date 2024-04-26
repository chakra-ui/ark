<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface HoverCardPositionerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { Presence } from '../presence'
import { useHoverCardContext } from './use-hover-card-context'

defineProps<HoverCardPositionerProps>()
const hoverCard = useHoverCardContext()
const renderStrategy = useRenderStrategyProps()
</script>

<template>
  <Presence
    v-bind="hoverCard.positionerProps"
    :present="hoverCard.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
