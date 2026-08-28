<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { CollectionItem } from '../collection/index.ts'
import type { UseSelectContext } from './use-select-context.ts'

export interface SelectContextProps<T extends CollectionItem> extends SlotsType<{
  default: UnwrapRef<UseSelectContext<T>>
}> {}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { useSelectContext } from './use-select-context.ts'

const select = useSelectContext()

defineSlots<{
  default(select: UnwrapRef<UseSelectContext<T>>): unknown
}>()
</script>

<template>
  <slot v-bind="select"></slot>
</template>
