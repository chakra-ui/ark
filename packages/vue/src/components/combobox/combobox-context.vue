<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseComboboxContext } from './use-combobox-context.ts'

export interface ComboboxContextProps extends SlotsType<{
  default: UnwrapRef<UseComboboxContext>
}> {}
</script>

<script setup lang="ts">
import { useComboboxContext } from './use-combobox-context.ts'

const combobox = useComboboxContext()

defineSlots<{
  default(combobox: UnwrapRef<UseComboboxContext>): unknown
}>()
</script>

<template>
  <slot v-bind="combobox"></slot>
</template>
