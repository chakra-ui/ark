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
   * Whether a filter input highlights the first item when its query changes.
   * - `true`: highlight it while the query is not empty
   * - `"always"`: highlight it even when the query is empty, and keep a highlight when the pointer leaves
   * @default false
   */
  autoHighlight?: boolean | 'always'
  /**
   * Whether to close the menu when an option is selected
   * @default true
   */
  closeOnSelect?: boolean
  /**
   * The menu's items, in order. Set it when the items are virtualized, so the keyboard
   * and typeahead can reach items that aren't rendered.
   */
  collection?: menu.Props['collection']
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
   * The element to focus when the menu closes.
   * Return `null` to use the default (the trigger, or the element focused before a context menu opened).
   */
  finalFocusEl?: menu.Props['finalFocusEl']
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
   * The element to focus when the menu opens.
   * Return `false` to skip moving focus, or `null` to use the default.
   */
  initialFocusEl?: menu.Props['initialFocusEl']
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
   * The type of popup the trigger opens.
   * - `"menu"`: the content is the menu and manages keyboard focus across its items.
   * - `"dialog"`: the content is a dialog holding the menu list, for widgets that keep focus such as a filter input.
   * @default "menu"
   */
  popupType?: 'menu' | 'dialog'
  /**
   * The options used to dynamically position the menu
   */
  positioning?: menu.PositioningOptions
  /**
   * Scrolls the item at an index into view, for virtualized items. Used with `collection`.
   */
  scrollToIndexFn?: menu.Props['scrollToIndexFn']
  /**
   * Whether the pressing printable characters should trigger typeahead navigation
   * @default true
   */
  typeahead?: boolean
  /**
   * The value of the trigger that currently open the menu
   */
  triggerValue?: string | null
  /**
   * The initial trigger value when rendered.
   * Use when you don't need to control the trigger value.
   */
  defaultTriggerValue?: string | null
}

export type RootEmits = {
  /**
   * Function called when the escape key is pressed
   */
  escapeKeyDown: [event: KeyboardEvent]
  /**
   * Function called when the animation ends in the open state
   */
  enterComplete: []
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
   * Function called when the trigger value changes
   */
  triggerValueChange: [details: menu.TriggerValueChangeDetails]
  /**
   * Function called when the menu is opened or closed.
   */
  'update:open': [open: boolean]
  /**
   * Function called when the highlighted menu item changes.
   */
  'update:highlightedValue': [highlightedValue: string | null]
  /**
   * The callback fired when the trigger value changes.
   */
  'update:triggerValue': [triggerValue: string | null]
}
