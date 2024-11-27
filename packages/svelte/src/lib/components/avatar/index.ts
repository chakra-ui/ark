export type { StatusChangeDetails as AvatarStatusChangeDetails } from '@zag-js/avatar'
// export { default as AvatarContext, type AvatarContextProps } from './avatar-context.svelte'
export {
  default as AvatarFallback,
  type AvatarFallbackProps,
  type AvatarFallbackBaseProps,
} from './avatar-fallback.svelte'
export {
  default as AvatarImage,
  type AvatarImageProps,
  type AvatarImageBaseProps,
} from './avatar-image.svelte'
export {
  default as AvatarRoot,
  type AvatarRootBaseProps,
  type AvatarRootProps,
} from './avatar-root.svelte'
export { useAvatarContext, type UseAvatarContext } from './use-avatar-context'
export { useAvatar, type UseAvatarProps, type UseAvatarReturn } from './use-avatar.svelte'
export {
  default as AvatarRootProvider,
  type AvatarRootProviderProps,
  type AvatarRootProviderBaseProps,
} from './avatar-root-provider.svelte'
export { avatarAnatomy } from './avatar.anatomy'

export * as Avatar from './avatar'
