<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseListboxItemContext } from './use-listbox-item-context.ts'

export interface ListboxItemContextProps extends SlotsType<{
  default: UnwrapRef<UseListboxItemContext>
}> {}
</script>

<script setup lang="ts">
import { useListboxItemContext } from './use-listbox-item-context.ts'

const context = useListboxItemContext()

defineSlots<{
  default(context: UnwrapRef<UseListboxItemContext>): unknown
}>()
</script>

<template>
  <slot v-bind="context"></slot>
</template>
