<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UsePaginationContext } from './use-pagination-context'

export interface PaginationContextProps
  extends SlotsType<{
    default: UnwrapRef<UsePaginationContext>
  }> {}
</script>

<script setup lang="ts">
import { usePaginationContext } from './use-pagination-context'

const pagination = usePaginationContext()

defineSlots<{
  default(pagination: UnwrapRef<UsePaginationContext>): unknown
}>()
</script>

<template>
  <slot v-bind="pagination"></slot>
</template>
