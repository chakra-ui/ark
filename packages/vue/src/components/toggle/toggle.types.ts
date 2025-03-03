export interface RootProps {
  /**
   * The default pressed state of the toggle.
   */
  defaultPressed?: boolean
  /**
   * Whether the toggle is disabled.
   */
  disabled?: boolean
  /**
   * The pressed state of the toggle.
   */
  pressed?: boolean
}

export type RootEmits = {
  /**
   * Event handler called when the pressed state of the toggle changes.
   */
  pressedChange: [pressed: boolean]
  /**
   * The callback fired when the pressed state changes.
   */
  'update:pressed': [pressed: boolean]
}
