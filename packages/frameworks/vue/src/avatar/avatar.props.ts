import type { Context, StatusChangeDetails } from '@zag-js/avatar'
import type { PropType } from 'vue'

export const avatarProps = {
  dir: {
    type: String as PropType<Context['dir']>,
  },
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  id: {
    type: String as PropType<Context['id']>,
  },
} as const

export type AvatarEmits = {
  /** Functional called when the image loading status changes. */
  loadingStatusChange: [details: StatusChangeDetails]
}
