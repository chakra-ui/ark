export type {
  ItemLabelDetails as PaginationItemLabelDetails,
  PageChangeDetails as PaginationPageChangeDetails,
  PageSizeChangeDetails as PaginationPageSizeChangeDetails,
} from '@zag-js/pagination'
export { type PaginationContextProps } from './pagination-context.vue'
export {
  type PaginationEllipsisProps,
  type PaginationEllipsisBaseProps,
} from './pagination-ellipsis.vue'
export {
  type PaginationItemProps,
  type PaginationItemBaseProps,
} from './pagination-item.vue'
export {
  type PaginationNextTriggerProps,
  type PaginationNextTriggerBaseProps,
} from './pagination-next-trigger.vue'
export {
  type PaginationPrevTriggerProps,
  type PaginationPrevTriggerBaseProps,
} from './pagination-prev-trigger.vue'
export {
  type PaginationRootProviderProps,
  type PaginationRootProviderBaseProps,
} from './pagination-root-provider.vue'
export {
  type PaginationRootEmits,
  type PaginationRootBaseProps,
  type PaginationRootProps,
} from './pagination-root.vue'
export { usePagination, type UsePaginationProps, type UsePaginationReturn } from './use-pagination'
export { usePaginationContext, type UsePaginationContext } from './use-pagination-context'
export { paginationAnatomy } from './pagination.anatomy'

export * as Pagination from './pagination'
