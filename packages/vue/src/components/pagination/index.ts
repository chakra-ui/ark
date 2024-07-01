export type {
  ItemLabelDetails as PaginationItemLabelDetails,
  PageChangeDetails as PaginationPageChangeDetails,
  PageSizeChangeDetails as PaginationPageSizeChangeDetails,
} from '@zag-js/pagination'
export { default as PaginationContext, type PaginationContextProps } from './pagination-context.vue'
export {
  default as PaginationEllipsis,
  type PaginationEllipsisProps,
  type PaginationEllipsisBaseProps,
} from './pagination-ellipsis.vue'
export {
  default as PaginationItem,
  type PaginationItemProps,
  type PaginationItemBaseProps,
} from './pagination-item.vue'
export {
  default as PaginationNextTrigger,
  type PaginationNextTriggerProps,
  type PaginationNextTriggerBaseProps,
} from './pagination-next-trigger.vue'
export {
  default as PaginationPrevTrigger,
  type PaginationPrevTriggerProps,
  type PaginationPrevTriggerBaseProps,
} from './pagination-prev-trigger.vue'
export {
  default as PaginationRootProvider,
  type PaginationRootProviderProps,
  type PaginationRootProviderBaseProps,
} from './pagination-root-provider.vue'
export {
  default as PaginationRoot,
  type PaginationRootEmits,
  type PaginationRootBaseProps,
  type PaginationRootProps,
} from './pagination-root.vue'
export { usePagination, type UsePaginationProps, type UsePaginationReturn } from './use-pagination'
export { usePaginationContext, type UsePaginationContext } from './use-pagination-context'
export { paginationAnatomy } from './pagination.anatomy'

export * as Pagination from './pagination'
