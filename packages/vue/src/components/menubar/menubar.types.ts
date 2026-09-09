import type * as menubar from '@zag-js/menubar'

export interface RootProps {
  /**
   * Whether the menubar (and all its menu triggers) is disabled.
   * @default false
   */
  disabled?: boolean
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the menubar. Useful for composition.
   */
  ids?: Partial<{ root: string }>
  /**
   * Whether to loop the keyboard navigation across the triggers.
   * @default true
   */
  loopFocus?: boolean
  /**
   * The orientation of the menubar.
   * @default "horizontal"
   */
  orientation?: menubar.Orientation
}
