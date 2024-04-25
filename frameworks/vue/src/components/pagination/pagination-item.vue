<script lang="ts">
import type { ItemProps } from '@zag-js/pagination'
import type { PolymorphicProps } from '../factory'

export interface PaginationItemProps extends PolymorphicProps, ItemProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

const props = defineProps<PaginationItemProps>()
const pagination = usePaginationContext()
</script>

<template>
  <ark.button v-bind="pagination.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
