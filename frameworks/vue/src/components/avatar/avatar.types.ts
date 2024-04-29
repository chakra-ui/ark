import type * as avatar from '@zag-js/avatar'

export interface RootProps {
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the elements in the avatar. Useful for composition.
   */
  ids?: Partial<{ root: string; image: string; fallback: string }>
}

export type RootEmits = {
  /**
   * Functional called when the image loading status changes.
   */
  statusChange: [details: avatar.StatusChangeDetails]
}
