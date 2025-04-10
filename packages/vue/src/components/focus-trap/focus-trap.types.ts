type FocusableElement = HTMLElement | SVGElement

type FocusTargetValue = FocusableElement | string
type FocusTarget = FocusTargetValue | (() => FocusTargetValue)

type FocusTargetValueOrFalse = FocusTargetValue | false
type FocusTargetOrFalse = FocusTargetValueOrFalse | (() => FocusTargetValueOrFalse)

export interface BaseProps {
  /**
   * Whether the focus trap is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Element to focus when trap is activated. By default, focuses on first tabbable element
   */
  initialFocus?: FocusTargetOrFalse | undefined | VoidFunction
  /**
   * Element to focus if initialFocus is not found. By default, focuses on container element
   */
  fallbackFocus?: FocusTarget
  /**
   * Whether to return focus to the element that had focus when trap was activated
   * @default true
   */
  returnFocusOnDeactivate?: boolean
  /**
   * Custom element to return focus to when trap is deactivated
   */
  setReturnFocus?: FocusTargetValueOrFalse | ((node: FocusableElement) => FocusTargetValueOrFalse)
}

export interface BaseEmits {
  /**
   * Function called when the focus trap is activated
   */
  activate: []
  /**
   * Function called when the focus trap is deactivated
   */
  deactivate: []
}
