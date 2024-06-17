<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface SelectPositionerBaseProps extends PolymorphicProps {}
export interface SelectPositionerProps
  extends SelectPositionerBaseProps,
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
    v-bind="select.getPositionerProps()"
    :present="select.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
