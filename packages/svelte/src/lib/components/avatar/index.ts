export type { StatusChangeDetails as AvatarStatusChangeDetails } from '@zag-js/avatar'
export { default as AvatarContext } from './avatar-context.svelte'
export {
  default as AvatarFallback,
  type AvatarFallbackBaseProps,
  type AvatarFallbackProps,
} from './avatar-fallback.svelte'
export {
  default as AvatarImage,
  type AvatarImageBaseProps,
  type AvatarImageProps,
} from './avatar-image.svelte'
export {
  default as AvatarRootProvider,
  type AvatarRootProviderBaseProps,
  type AvatarRootProviderProps,
} from './avatar-root-provider.svelte'
export {
  default as AvatarRoot,
  type AvatarRootBaseProps,
  type AvatarRootProps,
} from './avatar-root.svelte'
export { avatarAnatomy } from './avatar.anatomy'
export { useAvatarContext, type UseAvatarContext } from './use-avatar-context'
export { useAvatar, type UseAvatarProps, type UseAvatarReturn } from './use-avatar.svelte'

export * as Avatar from './avatar'
