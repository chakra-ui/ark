<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseColorPickerContext } from './use-color-picker-context'

export interface ColorPickerContextProps
  extends SlotsType<{
    default: UnwrapRef<UseColorPickerContext>
  }> {}
</script>

<script setup lang="ts">
import { useColorPickerContext } from './use-color-picker-context'

const colorPicker = useColorPickerContext()

defineSlots<{
  default(colorPicker: UnwrapRef<UseColorPickerContext>): unknown
}>()
</script>

<template>
  <slot v-bind="colorPicker"></slot>
</template>
