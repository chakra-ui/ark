<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { CollectionItem } from '../collection'
import type { UseSelectContext } from './use-select-context'

export interface SelectContextProps<T extends CollectionItem>
  extends SlotsType<{
    default: UnwrapRef<UseSelectContext<T>>
  }> {}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { useSelectContext } from './use-select-context'

const select = useSelectContext()

defineSlots<{
  default(select: UnwrapRef<UseSelectContext<T>>): unknown
}>()
</script>

<template>
  <slot v-bind="select"></slot>
</template>
