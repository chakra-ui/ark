export interface RootProps {
  /**
   * Whether the swap is in the "on" state.
   */
  swap?: boolean
  /**
   * Whether to enable lazy mounting.
   */
  lazyMount?: boolean
  /**
   * Whether to unmount on exit.
   */
  unmountOnExit?: boolean
}
