import type * as menu from '@zag-js/menu'

export interface RootProps {
  /**
   * The positioning point for the menu. Can be set by the context menu trigger or the button trigger.
   */
  anchorPoint?: import('/Users/christian/Workspace/ark-ui/node_modules/@zag-js/rect-utils/dist/index').Point
  /**
   * The accessibility label for the menu
   */
  'aria-label'?: string
  /**
   * Whether to close the menu when an option is selected
   */
  closeOnSelect?: boolean

  /**
   * The value of the highlighted menu item.
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
    label(id: string): string
    group(id: string): string
    positioner: string
    arrow: string
  }>
  /**
   * Whether to loop the keyboard navigation.
   */
  loopFocus?: boolean
  /**
   * Whether the menu is open
   */
  open?: boolean
  /**
   * The options used to dynamically position the menu
   */
  positioning?: import('/Users/christian/Workspace/ark-ui/node_modules/@zag-js/popper/dist/index').PositioningOptions
  /**
   * Whether the pressing printable characters should trigger typeahead navigation
   */
  typeahead?: boolean
}

export type RootEmits = {
  /**
   * Function called when the escape key is pressed
   */
  escapeKeyDown: [event: KeyboardEvent]
  /**
   * Function called when the focus is moved outside the component
   */
  focusOutside: [
    event: import('/Users/christian/Workspace/ark-ui/node_modules/@zag-js/interact-outside/dist/index').FocusOutsideEvent,
  ]
  /**
   * Function called when the highlighted menu item changes.
   */
  highlightChange: [details: menu.HighlightChangeDetails]
  /**
   * Function called when an interaction happens outside the component
   */
  interactOutside: [
    event: import('/Users/christian/Workspace/ark-ui/node_modules/@zag-js/interact-outside/dist/index').InteractOutsideEvent,
  ]
  /**
   * Function called when the menu opens or closes
   */
  openChange: [details: menu.OpenChangeDetails]
  /**
   * Function called when the pointer is pressed down outside the component
   */
  pointerDownOutside: [
    event: import('/Users/christian/Workspace/ark-ui/node_modules/@zag-js/interact-outside/dist/index').PointerDownOutsideEvent,
  ]
  /**
   * Function called when a menu item is selected.
   */
  select: [details: menu.SelectionDetails]
}
