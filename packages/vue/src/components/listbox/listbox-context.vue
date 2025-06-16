<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseListboxContext } from './use-listbox-context'

export interface ListboxContextProps
  extends SlotsType<{
    default: UnwrapRef<UseListboxContext>
  }> {}
</script>

<script setup lang="ts">
import { useListboxContext } from './use-listbox-context'

const listbox = useListboxContext()

defineSlots<{
  default(listbox: UnwrapRef<UseListboxContext>): unknown
}>()
</script>

<template>
  <slot v-bind="listbox"></slot>
</template>
