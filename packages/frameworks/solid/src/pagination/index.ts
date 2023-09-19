import { Pagination as PaginationRoot, type PaginationProps } from './pagination'
import { usePaginationContext, type PaginationContext } from './pagination-context'
import { PaginationEllipsis, type PaginationEllipsisProps } from './pagination-ellipsis'
import { PaginationList, type PaginationListProps } from './pagination-list'
import { PaginationListItem, type PaginationListItemProps } from './pagination-list-item'
import {
  PaginationNextPageTrigger,
  type PaginationNextPageTriggerProps,
} from './pagination-next-page-trigger'
import { PaginationPageTrigger, type PaginationPageTriggerProps } from './pagination-page-trigger'
import {
  PaginationPrevPageTrigger,
  type PaginationPrevPageTriggerProps,
} from './pagination-prev-page-trigger'

const Pagination = Object.assign(PaginationRoot, {
  Root: PaginationRoot,
  Ellipsis: PaginationEllipsis,
  List: PaginationList,
  ListItem: PaginationListItem,
  NextPageTrigger: PaginationNextPageTrigger,
  PageTrigger: PaginationPageTrigger,
  PrevPageTrigger: PaginationPrevPageTrigger,
})

export {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNextPageTrigger,
  PaginationPageTrigger,
  PaginationPrevPageTrigger,
  usePaginationContext,
}
export type {
  PaginationContext,
  PaginationEllipsisProps,
  PaginationListItemProps,
  PaginationListProps,
  PaginationNextPageTriggerProps,
  PaginationPageTriggerProps,
  PaginationPrevPageTriggerProps,
  PaginationProps,
}
