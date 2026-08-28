<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseAngleSliderContext } from './use-angle-slider-context.ts'

export interface AngleSliderContextProps extends SlotsType<{
  default: UnwrapRef<UseAngleSliderContext>
}> {}
</script>

<script setup lang="ts">
import { useAngleSliderContext } from './use-angle-slider-context.ts'

const angleSlider = useAngleSliderContext()

defineSlots<{
  default(angleSlider: UnwrapRef<UseAngleSliderContext>): unknown
}>()
</script>

<template>
  <slot v-bind="angleSlider"></slot>
</template>
