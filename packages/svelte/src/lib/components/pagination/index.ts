export type {
  ItemLabelDetails as PaginationItemLabelDetails,
  PageChangeDetails as PaginationPageChangeDetails,
  PageSizeChangeDetails as PaginationPageSizeChangeDetails,
  PageUrlDetails as PaginationPageUrlDetails,
} from '@zag-js/pagination'
export { default as PaginationContext, type PaginationContextProps } from './pagination-context.svelte'
export {
  default as PaginationEllipsis,
  type PaginationEllipsisBaseProps,
  type PaginationEllipsisProps,
} from './pagination-ellipsis.svelte'
export {
  default as PaginationItem,
  type PaginationItemBaseProps,
  type PaginationItemProps,
} from './pagination-item.svelte'
export {
  default as PaginationNextTrigger,
  type PaginationNextTriggerBaseProps,
  type PaginationNextTriggerProps,
} from './pagination-next-trigger.svelte'
export {
  default as PaginationPrevTrigger,
  type PaginationPrevTriggerBaseProps,
  type PaginationPrevTriggerProps,
} from './pagination-prev-trigger.svelte'
export {
  default as PaginationRootProvider,
  type PaginationRootProviderBaseProps,
  type PaginationRootProviderProps,
} from './pagination-root-provider.svelte'
export {
  default as PaginationRoot,
  type PaginationRootBaseProps,
  type PaginationRootProps,
} from './pagination-root.svelte'
export { paginationAnatomy } from './pagination.anatomy'
export { usePagination, type UsePaginationProps, type UsePaginationReturn } from './use-pagination.svelte'
export { usePaginationContext, type UsePaginationContext } from './use-pagination-context'

export * as Pagination from './pagination'
