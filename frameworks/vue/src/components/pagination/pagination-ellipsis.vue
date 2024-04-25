<script lang="ts">
import type { EllipsisProps } from '@zag-js/pagination'
import type { PolymorphicProps } from '../factory'

export interface PaginationEllipsisProps extends PolymorphicProps, EllipsisProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

const props = defineProps<PaginationEllipsisProps>()
const pagination = usePaginationContext()
</script>

<template>
  <ark.div v-bind="pagination.getEllipsisProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
