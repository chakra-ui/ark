export interface RootProps {
  /**
   * Whether the toggle is disabled.
   */
  disabled?: boolean
  /**
   * The default pressed state of the toggle.
   */
  defaultPressed?: boolean
  /**
   * The pressed state of the toggle.
   */
  modelValue?: boolean
  /**
   * Event handler called when the pressed state of the toggle changes.
   */
  'onUpdate:modelValue'?: (pressed: boolean) => void
}

export type RootEmits = {
  pressedChange: [value: boolean]
  'update:modelValue': [value: boolean]
}
