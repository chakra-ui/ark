import type {
  ItemLabelDetails as PaginationItemLabelDetails,
  PageChangeDetails as PaginationPageChangeDetails,
} from '@zag-js/pagination'
import { usePaginationContext, type PaginationContext } from './pagination-context'
import { PaginationEllipsis, type PaginationEllipsisProps } from './pagination-ellipsis'
import { PaginationItem, type PaginationItemProps } from './pagination-item'
import { PaginationNextTrigger, type PaginationNextTriggerProps } from './pagination-next-trigger'
import { PaginationPrevTrigger, type PaginationPrevTriggerProps } from './pagination-prev-trigger'
import { PaginationRoot, type PaginationRootProps } from './pagination-root'

export const Pagination = {
  Root: PaginationRoot,
  Ellipsis: PaginationEllipsis,
  Item: PaginationItem,
  NextTrigger: PaginationNextTrigger,
  PrevTrigger: PaginationPrevTrigger,
}

export {
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
  usePaginationContext,
}
export type {
  PaginationContext,
  PaginationEllipsisProps,
  PaginationItemLabelDetails,
  PaginationItemProps,
  PaginationNextTriggerProps,
  PaginationPageChangeDetails,
  PaginationPrevTriggerProps,
  PaginationRootProps,
}
