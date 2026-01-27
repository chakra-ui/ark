import type * as menu from '@zag-js/menu'

export interface RootProps {
  /**
   * The positioning point for the menu. Can be set by the context menu trigger or the button trigger.
   */
  anchorPoint?: menu.Point
  /**
   * The accessibility label for the menu
   */
  'aria-label'?: string
  /**
   * Whether to close the menu when an option is selected
   * @default true
   */
  closeOnSelect?: boolean
  /**
   * Whether the menu is a composed with other composite widgets like a combobox or tabs
   * @default true
   */
  composite?: boolean
  /**
   * The initial highlighted value of the menu item when rendered.
   * Use when you don't need to control the highlighted value of the menu item.
   */
  defaultHighlightedValue?: string
  /**
   * The initial open state of the menu when rendered.
   * Use when you don't need to control the open state of the menu.
   */
  defaultOpen?: boolean
  /**
   * The controlled highlighted value of the menu item.
   */
  highlightedValue?: string
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the menu. Useful for composition.
   */
  ids?: Partial<{
    trigger: string
    contextTrigger: string
    content: string
    groupLabel(id: string): string
    group(id: string): string
    positioner: string
    arrow: string
  }>
  /**
   * Whether to loop the keyboard navigation.
   * @default false
   */
  loopFocus?: boolean
  /**
   * Function to navigate to the selected item if it's an anchor element
   */
  navigate?: (details: menu.NavigateDetails) => void
  /**
   * The controlled open state of the menu
   */
  open?: boolean
  /**
   * The options used to dynamically position the menu
   */
  positioning?: menu.PositioningOptions
  /**
   * Whether the pressing printable characters should trigger typeahead navigation
   * @default true
   */
  typeahead?: boolean
}

export type RootEmits = {
  /**
   * Function called when the escape key is pressed
   */
  escapeKeyDown: [event: KeyboardEvent]
  /**
   * Function called when the animation ends in the closed state
   */
  exitComplete: []
  /**
   * Function called when the focus is moved outside the component
   */
  focusOutside: [event: menu.FocusOutsideEvent]
  /**
   * Function called when the highlighted menu item changes.
   */
  highlightChange: [details: menu.HighlightChangeDetails]
  /**
   * Function called when an interaction happens outside the component
   */
  interactOutside: [event: menu.InteractOutsideEvent]
  /**
   * Function called when the menu opens or closes
   */
  openChange: [details: menu.OpenChangeDetails]
  /**
   * Function called when the pointer is pressed down outside the component
   */
  pointerDownOutside: [event: menu.PointerDownOutsideEvent]
  /**
   * Function called when this layer is closed due to a parent layer being closed
   */
  requestDismiss: [
    event: CustomEvent<{
      originalLayer: HTMLElement
      targetLayer: HTMLElement | undefined
      originalIndex: number
      targetIndex: number
    }>,
  ]
  /**
   * Function called when a menu item is selected.
   */
  select: [details: menu.SelectionDetails]
  /**
   * Function called when the menu is opened or closed.
   */
  'update:open': [open: boolean]
  /**
   * Function called when the highlighted menu item changes.
   */
  'update:highlightedValue': [highlightedValue: string | null]
}
