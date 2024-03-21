import type { StatusChangeDetails as AvatarStatusChangeDetails } from '@zag-js/avatar'
import {
  AvatarContext,
  useAvatarContext,
  type AvatarContextProps,
  type UseAvatarContext,
} from './avatar-context'
import { AvatarFallback, type AvatarFallbackProps } from './avatar-fallback'
import { AvatarImage, type AvatarImageProps } from './avatar-image'
import { AvatarRoot, type AvatarRootProps } from './avatar-root'

export * as Avatar from './avatar'

export { AvatarContext, AvatarFallback, AvatarImage, AvatarRoot, useAvatarContext }

export type {
  AvatarContextProps,
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarRootProps,
  AvatarStatusChangeDetails,
  UseAvatarContext,
}
