<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ColorPickerAreaThumbProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerAreaThumbProps>()
const colorPicker = useColorPickerContext()
const areaProps = useColorPickerAreaPropsContext()
</script>

<template>
  <ark.div v-bind="colorPicker.getAreaThumbProps(areaProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
