import type * as combobox from '@zag-js/combobox'
import type { CollectionItem } from './combobox'

export interface RootProps<T extends CollectionItem = CollectionItem> {
  /**
   * Whether to allow typing custom values in the input
   */
  allowCustomValue?: boolean
  /**
   * Whether to autofocus the input on mount
   */
  autoFocus?: boolean
  /**
   * Whether to close the combobox when an item is selected.
   */
  closeOnSelect?: boolean
  /**
   * The initial open state of the combobox when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: boolean
  /**
   * Whether the combobox is disabled
   */
  disabled?: boolean
  /**
   * Whether to register this combobox as a dismissable layer
   */
  dismissable?: boolean
  /**
   * The associate form of the combobox.
   */
  form?: string
  /**
   * Function to get the display value of the selected item
   */
  getSelectionValue?: (details: combobox.SelectionValueDetails<T>) => string
  /**
   * The active item's id. Used to set the `aria-activedescendant` attribute
   */
  highlightedValue?: string
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the combobox. Useful for composition.
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
   * Defines the auto-completion behavior of the combobox.
   *
   * - `autohighlight`: The first focused item is highlighted as the user types
   * - `autocomplete`: Navigating the listbox with the arrow keys selects the item and the input is updated
   */
  inputBehavior?: 'autohighlight' | 'autocomplete' | 'none'
  /**
   * The current value of the combobox's input
   */
  inputValue?: string
  /**
   * Whether the combobox is required
   */
  invalid?: boolean
  /**
   * Whether the item is disabled
   */
  isItemDisabled?: (item: T) => boolean
  /**
   * The label of the item
   */
  itemToString?: (item: T) => string
  /**
   * The value of the item
   */
  itemToValue?: (item: T) => string
  /**
   * The options of the select
   */
  items: T[] | readonly T[]
  /**
   * Whether to loop the keyboard navigation through the items
   */
  loopFocus?: boolean
  modelValue?: string[]
  /**
   * Whether to allow multiple selection
   */
  multiple?: boolean
  /**
   * The `name` attribute of the combobox's input. Useful for form submission
   */
  name?: string
  /**
   * Whether the combobox is open
   */
  open?: boolean
  /**
   * Whether to show the combobox when the input value changes
   */
  openOnChange?: boolean | ((details: combobox.InputValueChangeDetails) => boolean)
  /**
   * Whether to open the combobox popup on initial click on the input
   */
  openOnClick?: boolean
  /**
   * Whether to open the combobox on arrow key press
   */
  openOnKeyPress?: boolean
  /**
   * The placeholder text of the combobox's input
   */
  placeholder?: string
  /**
   * The underling `aria-haspopup` attribute to use for the combobox
   * - `listbox`: The combobox has a listbox popup (default)
   * - `dialog`: The combobox has a dialog popup. Useful when in select only mode
   */
  popup?: 'listbox' | 'dialog'
  /**
   * The positioning options to dynamically position the menu
   */
  positioning?: combobox.PositioningOptions
  /**
   * Whether the combobox is readonly. This puts the combobox in a "non-editable" mode
   * but the user can still interact with it
   */
  readOnly?: boolean
  /**
   * Function to scroll to a specific index
   */
  scrollToIndexFn?: (details: combobox.ScrollToIndexDetails) => void
  /**
   * The behavior of the combobox input when an item is selected
   *
   * - `replace`: The selected item string is set as the input value
   * - `clear`: The input value is cleared
   * - `preserve`: The input value is preserved
   */
  selectionBehavior?: 'clear' | 'replace' | 'preserve'
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  // @ts-expect-error
  translations?: IntlTranslations
  /**
   * The keys of the selected items
   */
  value?: string[]
}

export type RootEmits<T extends CollectionItem = CollectionItem> = {
  /**
   * Function called when the focus is moved outside the component
   */
  focusOutside: [
    event: import('/Users/christian/Workspace/ark-ui/node_modules/@zag-js/interact-outside/dist/index').FocusOutsideEvent,
  ]
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
   * Function called when an interaction happens outside the component
   */
  interactOutside: [
    event: import('/Users/christian/Workspace/ark-ui/node_modules/@zag-js/interact-outside/dist/index').InteractOutsideEvent,
  ]
  /**
   * Function called when the popup is opened
   */
  openChange: [details: combobox.OpenChangeDetails]
  /**
   * Function called when the pointer is pressed down outside the component
   */
  pointerDownOutside: [
    event: import('/Users/christian/Workspace/ark-ui/node_modules/@zag-js/interact-outside/dist/index').PointerDownOutsideEvent,
  ]
  /**
   * Function called when a new item is selected
   */
  valueChange: [details: combobox.ValueChangeDetails<T>]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string[]]
  /**
   * Event handler called when the open state of the combobox changes.
   */
  'update:open': [open: boolean]
}
