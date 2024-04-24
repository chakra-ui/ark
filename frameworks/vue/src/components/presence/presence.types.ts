export interface PresenceRootProps {
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

export type PresenceRootEmits = {
  /**
   * Function called when the animation ends in the closed state.
   */
  exitComplete: []
}
