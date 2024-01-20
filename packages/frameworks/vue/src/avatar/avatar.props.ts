import type { StatusChangeDetails } from '@zag-js/avatar'
import type { BaseProps } from '../types'
import type { UseAvatarProps } from './use-avatar'

export interface AvatarRootProps extends BaseProps, UseAvatarProps {}
export interface AvatarImageProps extends BaseProps {} // not sure why adding src and alt prop breaks the AvatarImage component
export interface AvatarFallbackProps extends BaseProps {}

export type AvatarEmits = {
  /** Functional called when the image loading status changes. */
  loadingStatusChange: [details: StatusChangeDetails]
}
