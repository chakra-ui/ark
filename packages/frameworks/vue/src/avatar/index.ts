import type { StatusChangeDetails as AvatarStatusChangeDetails } from '@zag-js/avatar'
import { useAvatarContext, type AvatarContext } from './avatar-context'
import { AvatarFallback, type AvatarFallbackProps } from './avatar-fallback'
import { AvatarImage, type AvatarImageProps } from './avatar-image'
import { AvatarRoot, type AvatarRootProps } from './avatar-root'

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
