import type { StatusChangeDetails } from '@zag-js/avatar'

export type AvatarEmits = {
  /** Functional called when the image loading status changes. */
  loadingStatusChange: [details: StatusChangeDetails]
}
