import type { StatusChangeDetails as AvatarStatusChangeDetails } from '@zag-js/avatar'
import { type AvatarContext, useAvatarContext } from './avatar-context'
import { AvatarFallback, type AvatarFallbackProps } from './avatar-fallback'
import { AvatarImage, type AvatarImageProps } from './avatar-image'
import { AvatarRoot, type AvatarRootProps } from './avatar-root'

export * as Avatar from './avatar'

export { AvatarFallback, AvatarImage, AvatarRoot, useAvatarContext }

export type {
  AvatarContext,
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarRootProps,
  AvatarStatusChangeDetails,
}
