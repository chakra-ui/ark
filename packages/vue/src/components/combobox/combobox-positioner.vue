<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ComboboxPositionerBaseProps extends PolymorphicProps {}
export interface ComboboxPositionerProps
  extends ComboboxPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { Presence } from '../presence'
import { useComboboxContext } from './use-combobox-context'

defineProps<ComboboxPositionerProps>()
const combobox = useComboboxContext()
const renderStrategy = useRenderStrategyProps()
</script>

<template>
  <Presence
    v-bind="combobox.getPositionerProps()"
    :present="combobox.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
