export interface RootProps {
  /**
   * Whether to enable lazy mounting
   * @default false
   */
  lazyMount?: boolean
  /**
   * Whether the node is present (controlled by the user)
   */
  present?: boolean
  /**
   * Whether to unmount on exit.
   * @default false
   */
  unmountOnExit?: boolean
}

export type RootEmits = {
  /**
   * Function called when the animation ends in the closed state.
   */
  exitComplete: []
}
