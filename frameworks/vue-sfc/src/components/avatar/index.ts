import type { StatusChangeDetails as AvatarStatusChangeDetails } from '@zag-js/avatar'
import AvatarFallback, { type AvatarFallbackProps } from './avatar-fallback.vue'
import AvatarImage, { type AvatarImageProps } from './avatar-image.vue'
import AvatarRoot, { type AvatarRootProps } from './avatar-root.vue'
import { type UseAvatarContext, useAvatarContext } from './use-avatar-context'

export { AvatarFallback, AvatarImage, AvatarRoot, useAvatarContext }

export type {
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarRootProps,
  AvatarStatusChangeDetails,
  UseAvatarContext,
}
