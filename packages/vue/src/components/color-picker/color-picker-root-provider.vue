<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { PolymorphicProps } from '../factory'
import type { UseColorPickerReturn } from './use-color-picker'
import type { RootEmits as PresenceEmits } from '../presence/presence.types'

interface RootProviderProps {
  value: UnwrapRef<UseColorPickerReturn>
}

export interface ColorPickerRootProviderBaseProps extends RootProviderProps, RenderStrategyProps, PolymorphicProps {}
export interface ColorPickerRootProviderProps
  extends
    ColorPickerRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface ColorPickerRootProviderEmits extends PresenceEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { ColorPickerProvider } from './use-color-picker-context'

const props = defineProps<ColorPickerRootProviderProps>()
const emits = defineEmits<ColorPickerRootProviderEmits>()

const colorPicker = computed(() => props.value)

const presence = usePresence(
  computed(() => ({
    present: colorPicker.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  // @ts-expect-error TODO tweak EmitFn
  emits,
)

ColorPickerProvider(colorPicker)
PresenceProvider(presence)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="colorPicker.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
