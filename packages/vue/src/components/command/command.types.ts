import type * as combobox from '@zag-js/combobox'
import type { CollectionItem, ListCollection, PageListCollection } from '../collection/index.ts'

export type CommandFilter<T extends CollectionItem = CollectionItem> = (items: T[], query: string) => T[]

export interface CommandPageChangeDetails<T extends CollectionItem = CollectionItem> {
  page: string | null
  item: T | null
}

export interface RootProps<T extends CollectionItem> {
  /**
   * Whether to autofocus the input on mount
   */
  autoFocus?: boolean
  /**
   * The collection of items. Use `createPageListCollection` for nested pages,
   * where an item with a `parent` value is shown on the page of that item.
   */
  collection: ListCollection<T> | PageListCollection<T>
  /**
   * The initial highlighted value of the command when rendered.
   * Use when you don't need to control the highlighted value of the command.
   */
  defaultHighlightedValue?: string
  /**
   * The initial value of the command's input when rendered.
   * Use when you don't need to control the value of the command's input.
   * @default ""
   */
  defaultInputValue?: string
  /**
   * Whether the command is disabled
   */
  disabled?: boolean
  /**
   * Returns the items that match the query, best match first.
   * Defaults to a fuzzy search of the item text and its `keywords`.
   */
  filter?: CommandFilter<T>
  /**
   * The controlled highlighted value of the command
   */
  highlightedValue?: string
  /**
   * The unique identifier of the command
   */
  id?: string
  /**
   * The ids of the elements in the command. Useful for composition.
   */
  ids?: Partial<{
    root: string
    label: string
    control: string
    input: string
    content: string
    trigger: string
    clearTrigger: string
    item(id: string, index?: number): string
    positioner: string
    itemGroup(id: string | number): string
    itemGroupLabel(id: string | number): string
  }>
  /**
   * The controlled value of the command's input
   */
  inputValue?: string
  /**
   * Whether the results are being loaded (e.g. fetched from a server).
   */
  loading?: boolean
  /**
   * Whether to loop the keyboard navigation through the items
   * @default false
   */
  loopFocus?: boolean
  /**
   * Function to navigate to the selected item
   */
  navigate?: (details: combobox.NavigateDetails) => void
  /**
   * The placeholder text of the command's input
   */
  placeholder?: string
  /**
   * Function to scroll to a specific index
   */
  scrollToIndexFn?: (details: combobox.ScrollToIndexDetails) => void
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: combobox.IntlTranslations
}

export type RootEmits<T extends CollectionItem> = {
  /**
   * Function called when an item is highlighted using the pointer
   * or keyboard navigation.
   */
  highlightChange: [details: combobox.HighlightChangeDetails<T>]
  /**
   * Function called when the input's value changes
   */
  inputValueChange: [details: combobox.InputValueChangeDetails]
  /**
   * Function called when the page changes
   */
  pageChange: [details: CommandPageChangeDetails<T>]
  /**
   * Function called when an item is selected
   */
  select: [details: combobox.SelectionDetails]
  /**
   * The callback fired when the highlighted value changes.
   */
  'update:highlightedValue': [value: string | null]
  /**
   * The callback fired when the input value changes.
   */
  'update:inputValue': [value: string]
}
