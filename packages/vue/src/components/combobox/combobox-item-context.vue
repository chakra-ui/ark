<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseComboboxItemContext } from './use-combobox-item-context'

export interface ComboboxItemContextProps
  extends SlotsType<{
    default: UnwrapRef<UseComboboxItemContext>
  }> {}
</script>

<script setup lang="ts">
import { useComboboxItemContext } from './use-combobox-item-context'

const combobox = useComboboxItemContext()

defineSlots<{
  default(combobox: UnwrapRef<UseComboboxItemContext>): unknown
}>()
</script>

<template>
  <slot v-bind="combobox"></slot>
</template>
