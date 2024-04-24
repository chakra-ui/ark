import type * as avatar from '@zag-js/avatar'

export interface AvatarRootProps {
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.
   */
  getRootNode?: () => ShadowRoot | Node | Document
  /**
   * The document's text/writing direction.
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl'
}

export type AvatarRootEmits = {
  /**
   * Functional called when the image loading status changes.
   */
  statusChange: [details: avatar.StatusChangeDetails]
}
