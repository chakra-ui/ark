<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerAreaBackgroundBaseProps extends PolymorphicProps {}
export interface ColorPickerAreaBackgroundProps
  extends ColorPickerAreaBackgroundBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'
import { useForwardExpose } from '../../utils'

defineProps<ColorPickerAreaBackgroundProps>()
const colorPicker = useColorPickerContext()
const areaProps = useColorPickerAreaPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="colorPicker.getAreaBackgroundProps(areaProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
