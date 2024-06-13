export type {
  ItemLabelDetails as PaginationItemLabelDetails,
  PageChangeDetails as PaginationPageChangeDetails,
  PageSizeChangeDetails as PaginationPageSizeChangeDetails,
} from '@zag-js/pagination'
export {
  PaginationContext,
  type PaginationContextProps,
} from './pagination-context'
export {
  PaginationEllipsis,
  type PaginationEllipsisProps,
  type PaginationEllipsisBaseProps,
} from './pagination-ellipsis'
export {
  PaginationItem,
  type PaginationItemProps,
  type PaginationItemBaseProps,
} from './pagination-item'
export {
  PaginationNextTrigger,
  type PaginationNextTriggerProps,
  type PaginationNextTriggerBaseProps,
} from './pagination-next-trigger'
export {
  PaginationPrevTrigger,
  type PaginationPrevTriggerProps,
  type PaginationPrevTriggerBaseProps,
} from './pagination-prev-trigger'
export {
  PaginationRoot,
  type PaginationRootProps,
  type PaginationRootBaseProps,
} from './pagination-root'
export {
  PaginationRootProvider,
  type PaginationRootProviderProps,
  type PaginationRootProviderBaseProps,
} from './pagination-root-provider'
export { usePagination, type UsePaginationProps, type UsePaginationReturn } from './use-pagination'
export { usePaginationContext, type UsePaginationContext } from './use-pagination-context'

export * as Pagination from './pagination'
