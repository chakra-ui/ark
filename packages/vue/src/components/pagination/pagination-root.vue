<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './pagination.types.ts'

export interface PaginationRootBaseProps extends RootProps, PolymorphicProps {}
export interface PaginationRootProps
  extends
    PaginationRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface PaginationRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePagination } from './use-pagination.ts'
import { PaginationProvider } from './use-pagination-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<PaginationRootProps>()
const emits = defineEmits<PaginationRootEmits>()

const pagination = usePagination(props, emits)
PaginationProvider(pagination)

useForwardExpose()
</script>

<template>
  <ark.nav v-bind="pagination.getRootProps()" :as-child="asChild">
    <slot />
  </ark.nav>
</template>
