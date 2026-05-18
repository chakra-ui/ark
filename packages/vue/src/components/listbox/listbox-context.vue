<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { CollectionItem } from '../collection/index.ts'
import type { UseListboxContext } from './use-listbox-context.ts'

export interface ListboxContextProps<T extends CollectionItem> extends SlotsType<{
  default: UnwrapRef<UseListboxContext<T>>
}> {}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { useListboxContext } from './use-listbox-context.ts'

const listbox = useListboxContext()

defineSlots<{
  default(listbox: UnwrapRef<UseListboxContext<T>>): unknown
}>()
</script>

<template>
  <slot v-bind="listbox"></slot>
</template>
