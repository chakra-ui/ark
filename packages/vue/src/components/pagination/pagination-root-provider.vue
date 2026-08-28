<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UsePaginationReturn } from './use-pagination.ts'

interface RootProviderProps {
  value: UnwrapRef<UsePaginationReturn>
}

export interface PaginationRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface PaginationRootProviderProps
  extends
    PaginationRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { PaginationProvider } from './use-pagination-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

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
