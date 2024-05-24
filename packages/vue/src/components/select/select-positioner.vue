<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectPositionerProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { Presence } from '../presence'
import { useSelectContext } from './use-select-context'

defineProps<SelectPositionerProps>()
const select = useSelectContext()
const renderStrategy = useRenderStrategyProps()
</script>

<template>
  <Presence
    v-bind="select.positionerProps"
    :present="select.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
