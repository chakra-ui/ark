export type {
  ItemLabelDetails as PaginationItemLabelDetails,
  PageChangeDetails as PaginationPageChangeDetails,
  PageSizeChangeDetails as PaginationPageSizeChangeDetails,
} from '@zag-js/pagination'
export { default as PaginationContext, type PaginationContextProps } from './pagination-context.vue'
export {
  default as PaginationEllipsis,
  type PaginationEllipsisBaseProps,
  type PaginationEllipsisProps,
} from './pagination-ellipsis.vue'
export {
  default as PaginationItem,
  type PaginationItemBaseProps,
  type PaginationItemProps,
} from './pagination-item.vue'
export {
  default as PaginationNextTrigger,
  type PaginationNextTriggerBaseProps,
  type PaginationNextTriggerProps,
} from './pagination-next-trigger.vue'
export {
  default as PaginationPrevTrigger,
  type PaginationPrevTriggerBaseProps,
  type PaginationPrevTriggerProps,
} from './pagination-prev-trigger.vue'
export {
  default as PaginationRootProvider,
  type PaginationRootProviderBaseProps,
  type PaginationRootProviderProps,
} from './pagination-root-provider.vue'
export {
  default as PaginationRoot,
  type PaginationRootBaseProps,
  type PaginationRootEmits,
  type PaginationRootProps,
} from './pagination-root.vue'
export { paginationAnatomy } from './pagination.anatomy'
export { usePagination, type UsePaginationProps, type UsePaginationReturn } from './use-pagination'
export { usePaginationContext, type UsePaginationContext } from './use-pagination-context'

export * as Pagination from './pagination'
