<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerAreaThumbBaseProps extends PolymorphicProps {}
export interface ColorPickerAreaThumbProps
  extends ColorPickerAreaThumbBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerAreaThumbProps>()
const colorPicker = useColorPickerContext()
const areaProps = useColorPickerAreaPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="colorPicker.getAreaThumbProps(areaProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
