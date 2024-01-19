import type { Context, StatusChangeDetails } from '@zag-js/avatar'

export interface AvatarProps {
  /**
   * The document's text/writing direction.
   */
  dir?: Context['dir']
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: Context['getRootNode']
  /**
   * The unique identifier of the machine.
   */
  id?: Context['id']
}

export type AvatarEmits = {
  /** Functional called when the image loading status changes. */
  loadingStatusChange: [details: StatusChangeDetails]
}
