<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseToggleContext } from './use-toggle-context'

export interface ToggleContextProps
  extends SlotsType<{
    default: UnwrapRef<UseToggleContext>
  }> {}
</script>

<script setup lang="ts">
import { useToggleContext } from './use-toggle-context'

const toggle = useToggleContext()

defineSlots<{
  default(toggle: UnwrapRef<UseToggleContext>): unknown
}>()
</script>

<template>
  <slot v-bind="toggle"></slot>
</template>
