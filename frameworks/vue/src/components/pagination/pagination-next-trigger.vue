<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface PaginationNextTriggerProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'

defineProps<PaginationNextTriggerProps>()
const pagination = usePaginationContext()
</script>

<template>
  <ark.button v-bind="pagination.nextTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
