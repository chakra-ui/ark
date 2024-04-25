<script lang="ts">
import type { RootEmits, RootProps } from './pagination.types'

export interface PaginationRootProps extends RootProps, PolymorphicProps {}
export interface PaginationRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { usePagination } from './use-pagination'
import { PaginationProvider } from './use-pagination-context'

const props = defineProps<PaginationRootProps>()
const emits = defineEmits<PaginationRootEmits>()

const pagination = usePagination(props, emits)
PaginationProvider(pagination)
</script>

<template>
  <ark.div v-bind="pagination.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
