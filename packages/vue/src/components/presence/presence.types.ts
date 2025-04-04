export interface RootProps {
  /**
   * Whether to synchronize the present change immediately or defer it to the next frame
   * @default false
   */
  immediate?: boolean
  /**
   * Whether to enable lazy mounting
   * @default false
   */
  lazyMount?: boolean
  /**
   * Whether the node is present (controlled by the user)
   * @default false
   */
  present?: boolean
  /**
   * Whether to allow the initial presence animation.
   * @default false
   */
  skipAnimationOnMount?: boolean
  /**
   * Whether to unmount on exit.
   * @default false
   */
  unmountOnExit?: boolean
}

export type RootEmits = {
  /**
   * Function called when the animation ends in the closed state
   */
  exitComplete: []
}
