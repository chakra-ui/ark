<script lang="ts">
import type { EllipsisProps } from '@zag-js/pagination'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PaginationEllipsisBaseProps extends EllipsisProps, PolymorphicProps {}
export interface PaginationEllipsisProps
  extends
    PaginationEllipsisBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePaginationContext } from './use-pagination-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<PaginationEllipsisProps>()
const pagination = usePaginationContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="pagination.getEllipsisProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
