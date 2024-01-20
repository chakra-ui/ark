import type { StatusChangeDetails as AvatarStatusChangeDetails } from '@zag-js/avatar'
import AvatarFallback from './AvatarFallback.vue'
import AvatarImage from './AvatarImage.vue'
import AvatarRoot from './AvatarRoot.vue'
import { useAvatarContext, type AvatarContext } from './avatar-context'
import type { AvatarFallbackProps, AvatarImageProps, AvatarRootProps } from './avatar.props'

export const Avatar = {
  Root: AvatarRoot,
  Fallback: AvatarFallback,
  Image: AvatarImage,
}

export { AvatarFallback, AvatarImage, AvatarRoot, useAvatarContext }

export type {
  AvatarContext,
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarRootProps,
  AvatarStatusChangeDetails,
}
