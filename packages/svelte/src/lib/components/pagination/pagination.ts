export type { ItemLabelDetails, PageChangeDetails, PageSizeChangeDetails, PageUrlDetails } from '@zag-js/pagination'
export { default as Context, type PaginationContextProps as ContextProps } from './pagination-context.svelte'
export {
  default as Ellipsis,
  type PaginationEllipsisBaseProps as EllipsisBaseProps,
  type PaginationEllipsisProps as EllipsisProps,
} from './pagination-ellipsis.svelte'
export {
  default as Item,
  type PaginationItemBaseProps as ItemBaseProps,
  type PaginationItemProps as ItemProps,
} from './pagination-item.svelte'
export {
  default as NextTrigger,
  type PaginationNextTriggerBaseProps as NextTriggerBaseProps,
  type PaginationNextTriggerProps as NextTriggerProps,
} from './pagination-next-trigger.svelte'
export {
  default as PrevTrigger,
  type PaginationPrevTriggerBaseProps as PrevTriggerBaseProps,
  type PaginationPrevTriggerProps as PrevTriggerProps,
} from './pagination-prev-trigger.svelte'
export {
  default as Root,
  type PaginationRootBaseProps as RootBaseProps,
  type PaginationRootProps as RootProps,
} from './pagination-root.svelte'
export {
  default as RootProvider,
  type PaginationRootProviderBaseProps as RootProviderBaseProps,
  type PaginationRootProviderProps as RootProviderProps,
} from './pagination-root-provider.svelte'
