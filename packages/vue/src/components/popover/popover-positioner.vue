<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PopoverPositionerProps
  extends PolymorphicProps,
    /* @vue-ignore */ HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { Presence } from '../presence'
import { usePopoverContext } from './use-popover-context'

defineProps<PopoverPositionerProps>()

const popover = usePopoverContext()
const renderStrategy = useRenderStrategyProps()
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
