<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { type PolymorphicProps, ark } from '../factory'

export interface ColorPickerPositionerBaseProps extends PolymorphicProps {}
export interface ColorPickerPositionerProps
  extends ColorPickerPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
imimport { useForwardExpose,useRenderStrategyProps } from '../../utils'
import { PresenceProvider,usePresence } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'
efineProps<ColorPickerPositionerProps>()
const colorPicker = useColorPickerContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: colorPicker.value.open,
  })),
)

PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="colorPicker.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
