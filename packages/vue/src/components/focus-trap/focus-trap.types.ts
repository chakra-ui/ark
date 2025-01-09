export interface BaseProps {
  /**
   * Whether the focus trap is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Function called before focus trap activation to ensure it can be properly trapped
   */
  checkCanFocusTrap?: () => Promise<void> | void
  /**
   * Function called before focus trap deactivation to ensure focus can be returned
   */
  checkCanReturnFocus?: () => Promise<void> | void
  /**
   * Element to focus when trap is activated. By default, focuses on first tabbable element
   */
  initialFocus?: HTMLElement | string | (() => HTMLElement) | false
  /**
   * Element to focus if initialFocus is not found. By default, focuses on container element
   */
  fallbackFocus?: HTMLElement | string | (() => HTMLElement)
  /**
   * Whether to return focus to the element that had focus when trap was activated
   * @default true
   */
  returnFocusOnDeactivate?: boolean
  /**
   * Custom element to return focus to when trap is deactivated
   */
  setReturnFocus?: HTMLElement | string | (() => HTMLElement) | false
  /**
   * Whether pressing Escape deactivates the focus trap
   * @default true
   */
  escapeDeactivates?: boolean
  /**
   * Whether clicking outside the trap deactivates it
   * @default false
   */
  clickOutsideDeactivates?: boolean
  /**
   * Custom handler for clicks outside the trap
   */
  allowOutsideClick?: boolean | ((event: MouseEvent) => boolean)
  /**
   * Whether to prevent scrolling when trap is activated
   * @default true
   */
  preventScroll?: boolean
  /**
   * Whether to delay initial focus
   * @default true
   */
  delayInitialFocus?: boolean
  /**
   * Custom function to determine forward tab navigation
   */
  isKeyForward?: (event: KeyboardEvent) => boolean
  /**
   * Custom function to determine backward tab navigation
   */
  isKeyBackward?: (event: KeyboardEvent) => boolean
}

export interface BaseEmits {
  /**
   * Function called when the focus trap is activated
   */
  activate: []
  /**
   * Function called after the focus trap is activated
   */
  'post-activate': []
  /**
   * Function called when the focus trap is paused
   */
  pause: []
  /**
   * Function called after the focus trap is paused
   */
  'post-pause': []
  /**
   * Function called when the focus trap is unpaused
   */
  unpause: []
  /**
   * Function called after the focus trap is unpaused
   */
  'post-unpause': []
  /**
   * Function called when the focus trap is deactivated
   */
  deactivate: []
  /**
   * Function called after the focus trap is deactivated
   */
  'post-deactivate': []
}
