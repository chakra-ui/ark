<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerSwatchGroupBaseProps extends PolymorphicProps {}
export interface ColorPickerSwatchGroupProps
  extends ColorPickerSwatchGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { colorPickerAnatomy } from './color-picker.anatomy'
import { useForwardExpose } from '../../utils'

defineProps<ColorPickerSwatchGroupProps>()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="colorPickerAnatomy.build().swatchGroup.attrs" :as-child="asChild">
    <slot />
  </ark.div>
</template>
