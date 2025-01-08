<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'
import { type PresenceProps, usePresenceContext } from '../presence'

export interface ColorPickerContentBaseProps extends PresenceProps, PolymorphicProps {}
export interface ColorPickerContentProps
  extends ColorPickerContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { useForwardExpose } from '../../utils'

defineProps<ColorPickerContentProps>()
const colorPicker = useColorPickerContext()
const presence = usePresenceContext()
const mergedProps = computed(() =>
  mergeProps(colorPicker.value.getContentProps(), presence.value.presenceProps),
)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
