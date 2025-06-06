import type * as listbox from '@zag-js/listbox'
import type { CollectionItem, ListCollection } from '../collection'

export interface RootProps<T extends CollectionItem> {
  /**
   * The collection of items
   */
  collection: ListCollection<T>
  /**
   * The initial value of the highlighted item when opened.
   * Use when you don't need to control the highlighted value of the listbox.
   */
  defaultHighlightedValue?: string
  /**
   * The initial default value of the listbox when rendered.
   * Use when you don't need to control the value of the listbox.
   *
   * @default []
   */
  defaultValue?: string[]
  /**
   * Whether to disallow empty selection
   */
  deselectable?: boolean
  /**
   * Whether the listbox is disabled
   */
  disabled?: boolean
  /**
   * Whether to disallow selecting all items when `meta+a` is pressed
   */
  disallowSelectAll?: boolean
  /**
   * The controlled key of the highlighted item
   */
  highlightedValue?: string
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the listbox. Useful for composition.
   */
  ids?: Partial<{
    root: string
    content: string
    label: string
    item(id: string | number): string
    itemGroup(id: string | number): string
    itemGroupLabel(id: string | number): string
  }>
  /**
   * Whether to loop the keyboard navigation through the options
   * @default false
   */
  loopFocus?: boolean
  /**
   * The model value of the listbox
   */
  modelValue?: string[]
  /**
   * The orientation of the element.
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * Function to scroll to a specific index
   */
  scrollToIndexFn?: (details: listbox.ScrollToIndexDetails) => void
  /**
   * Whether to select the item when it is highlighted
   */
  selectOnHighlight?: boolean
  /**
   * How multiple selection should behave in the listbox.
   *
   * - `single`: The user can select a single item.
   * - `multiple`: The user can select multiple items without using modifier keys.
   * - `extended`: The user can select multiple items by using modifier keys.
   *
   * @default "single"
   */
  selectionMode?: listbox.SelectionMode
  /**
   * Whether to enable typeahead on the listbox
   */
  typeahead?: boolean
}

export type RootEmits<T extends CollectionItem> = {
  /**
   * The callback fired when the highlighted item changes.
   */
  highlightChange: [details: listbox.HighlightChangeDetails<T>]
  /**
   * Function called when an item is selected
   */
  select: [details: listbox.SelectionDetails]
  /**
   * The callback fired when the selected item changes.
   */
  valueChange: [details: listbox.ValueChangeDetails<T>]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string[]]
}
