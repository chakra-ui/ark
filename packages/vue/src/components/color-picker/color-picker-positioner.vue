<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerPositionerBaseProps extends PolymorphicProps {}
export interface ColorPickerPositionerProps
  extends
    ColorPickerPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerPositionerProps>()

const colorPicker = useColorPickerContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="colorPicker.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
