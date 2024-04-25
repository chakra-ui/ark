<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ComboboxPositionerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { useRenderStrategyContext } from '../../utils/use-render-strategy'
import { Presence } from '../presence'
import { useComboboxContext } from './use-combobox-context'

defineProps<ComboboxPositionerProps>()
const combobox = useComboboxContext()
const renderStrategy = useRenderStrategyContext()
</script>

<template>
  <Presence
    v-bind="combobox.positionerProps"
    :present="combobox.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
