import type { StatusChangeDetails } from '@zag-js/avatar'
import { AvatarContext as Context, type AvatarContextProps as ContextProps } from './avatar-context'
import {
  AvatarFallback as Fallback,
  type AvatarFallbackProps as FallbackProps,
} from './avatar-fallback'
import { AvatarImage as Image, type AvatarImageProps as ImageProps } from './avatar-image'
import { AvatarRoot as Root, type AvatarRootProps as RootProps } from './avatar-root'

export { Context, Fallback, Image, Root }
export type { ContextProps, FallbackProps, ImageProps, RootProps, StatusChangeDetails }
