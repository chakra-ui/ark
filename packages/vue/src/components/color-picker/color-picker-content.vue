<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import { type PresenceProps, usePresenceContext } from '../presence/index.ts'

export interface ColorPickerContentBaseProps extends PresenceProps, PolymorphicProps {}
export interface ColorPickerContentProps
  extends
    ColorPickerContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerContentProps>()
const colorPicker = useColorPickerContext()
const presence = usePresenceContext()
const mergedProps = computed(() => mergeProps(colorPicker.value.getContentProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
