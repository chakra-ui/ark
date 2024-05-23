<script lang="ts">
import type { AreaProps } from '@zag-js/color-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerAreaProps
  extends AreaProps,
    PolymorphicProps,
    /* @vue-ignore */ HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { ColorPickerAreaPropsProvider } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'

const props = defineProps<ColorPickerAreaProps>()
const colorPicker = useColorPickerContext()

ColorPickerAreaPropsProvider(props)
</script>

<template>
  <ark.div v-bind="colorPicker.getAreaProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
