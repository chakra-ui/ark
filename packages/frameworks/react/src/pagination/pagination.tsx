import type { ItemLabelDetails, PageChangeDetails } from '@zag-js/pagination'
import {
  PaginationContext as Context,
  type PaginationContextProps as ContextProps,
} from './pagination-context'
import {
  PaginationEllipsis as Ellipsis,
  type PaginationEllipsisProps as EllipsisProps,
} from './pagination-ellipsis'
import { PaginationItem as Item, type PaginationItemProps as ItemProps } from './pagination-item'
import {
  PaginationNextTrigger as NextTrigger,
  type PaginationNextTriggerProps as NextTriggerProps,
} from './pagination-next-trigger'
import {
  PaginationPrevTrigger as PrevTrigger,
  type PaginationPrevTriggerProps as PrevTriggerProps,
} from './pagination-prev-trigger'
import { PaginationRoot as Root, type PaginationRootProps as RootProps } from './pagination-root'

export { Context, Ellipsis, Item, NextTrigger, PrevTrigger, Root }
export type {
  ContextProps,
  EllipsisProps,
  ItemLabelDetails,
  ItemProps,
  NextTriggerProps,
  PageChangeDetails,
  PrevTriggerProps,
  RootProps,
}
