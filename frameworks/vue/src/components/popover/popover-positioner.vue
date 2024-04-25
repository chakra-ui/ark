<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface PopoverPositionerProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { useRenderStrategyContext } from '../../utils/use-render-strategy'
import { Presence } from '../presence'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverPositionerProps>()

const popover = usePopoverContext()
const renderStrategy = useRenderStrategyContext()
</script>

<template>
  <Presence
    v-bind="popover.positionerProps"
    :present="popover.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
