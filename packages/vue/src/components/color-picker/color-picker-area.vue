<script lang="ts">
import type { AreaProps } from '@zag-js/color-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerAreaBaseProps extends AreaProps, PolymorphicProps {}
export interface ColorPickerAreaProps
  extends
    ColorPickerAreaBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { ColorPickerAreaPropsProvider } from './use-color-picker-area-props-context.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ColorPickerAreaProps>()
const colorPicker = useColorPickerContext()

ColorPickerAreaPropsProvider(props)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="colorPicker.getAreaProps(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
