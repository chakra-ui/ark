<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface PaginationPrevTriggerProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

defineProps<PaginationPrevTriggerProps>()
const pagination = usePaginationContext()
</script>

<template>
  <ark.button v-bind="pagination.prevTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
