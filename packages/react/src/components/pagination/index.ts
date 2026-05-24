export type {
  ItemLabelDetails as PaginationItemLabelDetails,
  PageChangeDetails as PaginationPageChangeDetails,
  PageSizeChangeDetails as PaginationPageSizeChangeDetails,
  PageUrlDetails as PaginationPageUrlDetails,
} from '@zag-js/pagination'
export { PaginationContext, type PaginationContextProps } from './pagination-context.tsx'
export {
  PaginationEllipsis,
  type PaginationEllipsisBaseProps,
  type PaginationEllipsisProps,
} from './pagination-ellipsis.tsx'
export {
  PaginationFirstTrigger,
  type PaginationFirstTriggerBaseProps,
  type PaginationFirstTriggerProps,
} from './pagination-first-trigger.tsx'
export { PaginationItem, type PaginationItemBaseProps, type PaginationItemProps } from './pagination-item.tsx'
export {
  PaginationLastTrigger,
  type PaginationLastTriggerBaseProps,
  type PaginationLastTriggerProps,
} from './pagination-last-trigger.tsx'
export {
  PaginationNextTrigger,
  type PaginationNextTriggerBaseProps,
  type PaginationNextTriggerProps,
} from './pagination-next-trigger.tsx'
export {
  PaginationPrevTrigger,
  type PaginationPrevTriggerBaseProps,
  type PaginationPrevTriggerProps,
} from './pagination-prev-trigger.tsx'
export { PaginationRoot, type PaginationRootBaseProps, type PaginationRootProps } from './pagination-root.tsx'
export {
  PaginationRootProvider,
  type PaginationRootProviderBaseProps,
  type PaginationRootProviderProps,
} from './pagination-root-provider.tsx'
export { paginationAnatomy } from './pagination.anatomy.ts'
export { usePagination, type UsePaginationProps, type UsePaginationReturn } from './use-pagination.ts'
export { usePaginationContext, type UsePaginationContext } from './use-pagination-context.ts'

export * as Pagination from './pagination.ts'
