import type { Context, StatusChangeDetails } from '@zag-js/avatar'
import type { PropType } from 'vue'

export const avatarProps = {
  /** The document's text/writing direction. */
  dir: {
    type: String as PropType<Context['dir']>,
  },
  /** A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron. */
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  /** The unique identifier of the machine. */
  id: {
    type: String as PropType<Context['id']>,
  },
} as const

export type AvatarEmits = {
  /** Functional called when the image loading status changes. */
  loadingStatusChange: [details: StatusChangeDetails]
}
