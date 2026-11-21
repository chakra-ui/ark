import type { Api, Props } from '@zag-js/combobox'

import type { CollectionItem, ListCollection, PageListCollection } from '../collection/index.js'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import type { CommandFilter } from './shared.js'
import './root.js'
import './parts.js'
import type {
  CommandLabel,
  CommandControl,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItemGroup,
  CommandItemGroupLabel,
  CommandItem,
  CommandItemText,
} from './parts.js'

type PropTypes = Api extends Api<infer P> ? P : never

export type { Api as CommandApi } from '@zag-js/combobox'
export type { CommandFilter } from './shared.js'
export {
  createListCollection,
  createPageListCollection,
  type CollectionItem,
  type CollectionOptions,
  type ListCollection,
  type PageListCollection,
  type PageListCollectionOptions,
} from '../collection/index.js'

export interface CommandPageChangeDetails<T extends CollectionItem = CollectionItem> {
  page: string | null
  item: T | null
}

type CommandProps<T extends CollectionItem> = Props<T> & {
  onPageChange?: ((details: CommandPageChangeDetails<T>) => void) | undefined
}

export type CommandEventMap<T extends CollectionItem = CollectionItem> = Pick<
  CallbackEvents<CommandProps<T>>,
  'inputvaluechange' | 'highlightchange' | 'itemselect' | 'pagechange'
>

export interface CommandElement<T extends CollectionItem = CollectionItem>
  extends
    RootElement<Api<PropTypes, T>, CommandProps<T>>,
    Pick<FunctionProperties<Props<T>>, 'navigate' | 'scrollToIndexFn'>,
    Pick<Props<T>, 'ids' | 'translations'>,
    StateProperties<Props<T>, 'inputValue'>,
    CommandPages<T> {
  /**
   * The items, e.g. from `createListCollection`, or `createPageListCollection` for nested pages,
   * where an item with a `parent` value is shown on the page of that item
   */
  collection?: ListCollection<T> | PageListCollection<T> | undefined
  /**
   * Returns the items that match the query. Defaults to a fuzzy search of the item text and its `keywords`.
   */
  filter?: CommandFilter<T> | undefined
}

export interface CommandPages<T extends CollectionItem = CollectionItem> {
  /**
   * The value of the item whose page is open, or `null` at the top level
   */
  readonly page: string | null
  /**
   * The items from the top level to the open page
   */
  readonly path: T[]
  /**
   * Whether there's a page to go back to
   */
  readonly canGoBack: boolean
  /**
   * Opens the page of an item, or the top level for `null`
   */
  setPage(value: string | null): void
  /**
   * Goes back to the previous page, restoring its query. Returns `false` when there's none.
   */
  back(): boolean
  /**
   * Goes up to the parent page. Returns `false` at the top level.
   */
  up(): boolean
  /**
   * Whether the item opens a page
   */
  isPage(item: T): boolean
  /**
   * The item's pages below the open page, e.g. to show where a search result lives
   */
  getAncestors(item: T): T[]
}

declare global {
  interface HTMLElementTagNameMap {
    'ark-command': CommandElement
    'ark-command-label': InstanceType<typeof CommandLabel>
    'ark-command-control': InstanceType<typeof CommandControl>
    'ark-command-input': InstanceType<typeof CommandInput>
    'ark-command-list': InstanceType<typeof CommandList>
    'ark-command-empty': InstanceType<typeof CommandEmpty>
    'ark-command-item-group': InstanceType<typeof CommandItemGroup>
    'ark-command-item-group-label': InstanceType<typeof CommandItemGroupLabel>
    'ark-command-item': InstanceType<typeof CommandItem>
    'ark-command-item-text': InstanceType<typeof CommandItemText>
  }
}
