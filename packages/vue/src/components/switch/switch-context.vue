<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseSwitchContext } from './use-switch-context.ts'

export interface SwitchContextProps extends SlotsType<{
  default: UnwrapRef<UseSwitchContext>
}> {}
</script>

<script setup lang="ts">
import { useSwitchContext } from './use-switch-context.ts'

const context = useSwitchContext()

defineSlots<{
  default(context: UnwrapRef<UseSwitchContext>): unknown
}>()
</script>

<template>
  <slot v-bind="context" />
</template>
