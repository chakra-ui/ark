import type * as avatar from '@zag-js/avatar'

export interface RootProps {
  /**
   * The unique identifier of the machine.
   */
  id?: string
}

export type RootEmits = {
  /**
   * Functional called when the image loading status changes.
   */
  statusChange: [details: avatar.StatusChangeDetails]
}
