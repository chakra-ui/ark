import type * as select from '@zag-js/select'

export interface SelectRootProps {
  /**
   * Whether the select should close after an item is selected
   */
  closeOnSelect?: boolean
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
  /**
   * Whether the select is disabled
   */
  disabled?: boolean
  /**
   * The associate form of the underlying select.
   */
  form?: string
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Node | Document
  /**
   * The key of the highlighted item
   */
  highlightedValue?: string
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the select. Useful for composition.
   */
  ids?: Partial<{
    root: string
    content: string
    control: string
    trigger: string
    clearTrigger: string
    label: string
    hiddenSelect: string
    positioner: string
    item(id: string | number): string
    itemGroup(id: string | number): string
    itemGroupLabel(id: string | number): string
  }>
  /**
   * Whether the select is invalid
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
   * Whether to loop the keyboard navigation through the options
   */
  loopFocus?: boolean
  modelValue?: string[]
  /**
   * Whether to allow multiple selection
   */
  multiple?: boolean
  /**
   * The `name` attribute of the underlying select.
   */
  name?: string
  /**
   * Whether the select menu is open
   */
  open?: boolean
  /**
   * The positioning options of the menu.
   */
  positioning?: select.PositioningOptions
  /**
   * Whether the select is read-only
   */
  readOnly?: boolean
  /**
   * Function to scroll to a specific index
   */
  scrollToIndexFn?: (details: select.ScrollToIndexDetails) => void
  /**
   * The keys of the selected items
   */
  value?: string[]
}

export type SelectRootEmits = {
  /**
   * Function called when the focus is moved outside the component
   */
  focusOutside: [event: select.FocusOutsideEvent]
  /**
   * The callback fired when the highlighted item changes.
   */
  highlightChange: [details: select.HighlightChangeDetails<T>]
  /**
   * Function called when an interaction happens outside the component
   */
  interactOutside: [event: select.InteractOutsideEvent]
  /**
   * Function called when the popup is opened
   */
  openChange: [details: select.OpenChangeDetails]
  /**
   * Function called when the pointer is pressed down outside the component
   */
  pointerDownOutside: [event: select.PointerDownOutsideEvent]
  /**
   * The callback fired when the selected item changes.
   */
  valueChange: [details: select.ValueChangeDetails<T>]
  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string[]]
}
