<script lang="ts">
import type { EllipsisProps } from '@zag-js/pagination'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PaginationEllipsisBaseProps extends EllipsisProps, PolymorphicProps {}
export interface PaginationEllipsisProps
  extends PaginationEllipsisBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePaginationContext } from './use-pagination-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<PaginationEllipsisProps>()
const pagination = usePaginationContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="pagination.getEllipsisProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
