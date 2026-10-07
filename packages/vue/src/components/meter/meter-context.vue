<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseMeterContext } from './use-meter-context.ts'

export interface MeterContextProps extends SlotsType<{
  default: UnwrapRef<UseMeterContext>
}> {}
</script>

<script setup lang="ts">
import { useMeterContext } from './use-meter-context.ts'

const meter = useMeterContext()

defineSlots<{
  default(meter: UnwrapRef<UseMeterContext>): unknown
}>()
</script>

<template>
  <slot v-bind="meter"></slot>
</template>
