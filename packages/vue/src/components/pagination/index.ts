export type {
  ItemLabelDetails as PaginationItemLabelDetails,
  PageChangeDetails as PaginationPageChangeDetails,
  PageSizeChangeDetails as PaginationPageSizeChangeDetails,
} from '@zag-js/pagination'
export * as Pagination from './pagination'
export { default as PaginationContext, type PaginationContextProps } from './pagination-context.vue'
export {
  default as PaginationEllipsis,
  type PaginationEllipsisProps,
} from './pagination-ellipsis.vue'
export { default as PaginationItem, type PaginationItemProps } from './pagination-item.vue'
export {
  default as PaginationNextTrigger,
  type PaginationNextTriggerProps,
} from './pagination-next-trigger.vue'
export {
  default as PaginationPrevTrigger,
  type PaginationPrevTriggerProps,
} from './pagination-prev-trigger.vue'
export {
  default as PaginationRoot,
  type PaginationRootEmits,
  type PaginationRootProps,
} from './pagination-root.vue'
export { usePaginationContext, type UsePaginationContext } from './use-pagination-context'
