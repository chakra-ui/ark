<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerAreaBackgroundProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerAreaBackgroundProps>()
const colorPicker = useColorPickerContext()
const areaProps = useColorPickerAreaPropsContext()
</script>

<template>
  <ark.div v-bind="colorPicker.getAreaBackgroundProps(areaProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
