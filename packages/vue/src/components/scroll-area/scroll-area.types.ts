import type * as scrollArea from '@zag-js/scroll-area'

export interface RootProps {
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the scroll area elements
   */
  ids?: scrollArea.ElementIds
}

export type RootEmits = {}
