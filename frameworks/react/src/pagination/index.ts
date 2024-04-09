import type {
  ItemLabelDetails as PaginationItemLabelDetails,
  PageChangeDetails as PaginationPageChangeDetails,
} from '@zag-js/pagination'
import { PaginationContext, type PaginationContextProps } from './pagination-context'
import { PaginationEllipsis, type PaginationEllipsisProps } from './pagination-ellipsis'
import { PaginationItem, type PaginationItemProps } from './pagination-item'
import { PaginationNextTrigger, type PaginationNextTriggerProps } from './pagination-next-trigger'
import { PaginationPrevTrigger, type PaginationPrevTriggerProps } from './pagination-prev-trigger'
import { PaginationRoot, type PaginationRootProps } from './pagination-root'
import { usePaginationContext, type UsePaginationContext } from './use-pagination-context'

export * as Pagination from './pagination'

export {
  PaginationContext,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
  usePaginationContext,
}
export type {
  PaginationContextProps,
  PaginationEllipsisProps,
  PaginationItemLabelDetails,
  PaginationItemProps,
  PaginationNextTriggerProps,
  PaginationPageChangeDetails,
  PaginationPrevTriggerProps,
  PaginationRootProps,
  UsePaginationContext,
}
