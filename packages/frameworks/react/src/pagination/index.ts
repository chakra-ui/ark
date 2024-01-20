import type {
  ItemLabelDetails as PaginationItemLabelDetails,
  PageChangeDetails as PaginationPageChangeDetails,
} from '@zag-js/pagination'
import { Pagination as PaginationRoot, type PaginationProps } from './pagination'
import { usePaginationContext, type PaginationContext } from './pagination-context'
import { PaginationEllipsis, type PaginationEllipsisProps } from './pagination-ellipsis'
import { PaginationItem, type PaginationItemProps } from './pagination-item'
import { PaginationNextTrigger, type PaginationNextTriggerProps } from './pagination-next-trigger'
import { PaginationPrevTrigger, type PaginationPrevTriggerProps } from './pagination-prev-trigger'

const Pagination = Object.assign(PaginationRoot, {
  Root: PaginationRoot,
  Ellipsis: PaginationEllipsis,
  Item: PaginationItem,
  NextTrigger: PaginationNextTrigger,
  PrevTrigger: PaginationPrevTrigger,
})

export {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
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
  PaginationProps,
}
