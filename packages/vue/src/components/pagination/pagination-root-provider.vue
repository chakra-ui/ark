<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UsePaginationReturn } from './use-pagination'

interface RootProviderProps {
  value: UnwrapRef<UsePaginationReturn>
}

export interface PaginationRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface PaginationRootProviderProps
  extends PaginationRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
iimport { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { PaginationProvider } from './use-pagination-context'
const props = defineProps<PaginationRootProviderProps>()
const pagination = computed(() => props.value)

PaginationProvider(pagination)

useForwardExpose()
</script>

<template>
  <ark.nav v-bind="pagination.getRootProps()" :as-child="asChild">
    <slot />
  </ark.nav>
</template>
