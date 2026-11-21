import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/combobox'
import type { RootElement } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type { Item, ItemInput } from '../../utils/collection.js'
import type { CommandFilter } from './shared.js'

export type { Api as CommandApi } from '@zag-js/combobox'
export type { CommandFilter } from './shared.js'

export interface CommandPageChangeDetails {
  page: string | null
  item: Item | null
}

type CommandProps = Props & { onPageChange?: ((details: CommandPageChangeDetails) => void) | undefined }

export type CommandEventMap = Pick<
  CallbackEvents<CommandProps>,
  'inputvaluechange' | 'highlightchange' | 'itemselect' | 'pagechange'
>

export type CommandElement = RootElement<Api, CommandProps> &
  Pick<FunctionProperties<Props>, 'navigate' | 'scrollToIndexFn'> &
  Pick<Props, 'ids' | 'translations'> &
  CommandPages & { items?: ItemInput[]; filter?: CommandFilter }

export interface CommandPages {
  /**
   * The value of the item whose page is open, or `null` at the top level
   */
  readonly page: string | null
  /**
   * The items from the top level to the open page
   */
  readonly path: Item[]
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
  isPage(item: Item): boolean
  /**
   * The item's pages below the open page, e.g. to show where a search result lives
   */
  getAncestors(item: Item): Item[]
}

declare global {
  interface HTMLElementTagNameMap {
    'ark-command': CommandElement
  }
}
