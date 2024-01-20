import type { StatusChangeDetails as AvatarStatusChangeDetails } from '@zag-js/avatar'
import AvatarFallback, { type AvatarFallbackProps } from './AvatarFallback.vue'
import AvatarImage, { type AvatarImageProps } from './AvatarImage.vue'
import AvatarRoot, { type AvatarRootProps } from './AvatarRoot.vue'
import { useAvatarContext, type AvatarContext } from './avatar-context'

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
