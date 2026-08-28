export type { StatusChangeDetails as AvatarStatusChangeDetails } from '@zag-js/avatar'
export { AvatarContext, type AvatarContextProps } from './avatar-context.tsx'
export { AvatarFallback, type AvatarFallbackBaseProps, type AvatarFallbackProps } from './avatar-fallback.tsx'
export { AvatarImage, type AvatarImageBaseProps, type AvatarImageProps } from './avatar-image.tsx'
export { AvatarRoot, type AvatarRootBaseProps, type AvatarRootProps } from './avatar-root.tsx'
export {
  AvatarRootProvider,
  type AvatarRootProviderBaseProps,
  type AvatarRootProviderProps,
} from './avatar-root-provider.tsx'
export { avatarAnatomy } from './avatar.anatomy.ts'
export { useAvatar, type UseAvatarProps, type UseAvatarReturn } from './use-avatar.ts'
export { useAvatarContext, type UseAvatarContext } from './use-avatar-context.ts'

export * as Avatar from './avatar.ts'
