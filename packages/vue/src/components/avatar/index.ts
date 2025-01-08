export type { StatusChangeDetails as AvatarStatusChangeDetails } from '@zag-js/avatar'
export { default as AvatarContext, type AvatarContextProps } from './avatar-context.vue'
export {
  default as AvatarFallback,
  type AvatarFallbackProps,
  type AvatarFallbackBaseProps,
} from './avatar-fallback.vue'
export {
  default as AvatarImage,
  type AvatarImageProps,
  type AvatarImageBaseProps,
} from './avatar-image.vue'
export {
  default as AvatarRoot,
  type AvatarRootEmits,
  type AvatarRootBaseProps,
  type AvatarRootProps,
} from './avatar-root.vue'
export { useAvatarContext, type UseAvatarContext } from './use-avatar-context'
export { useAvatar, type UseAvatarProps, type UseAvatarReturn } from './use-avatar'
export {
  default as AvatarRootProvider,
  type AvatarRootProviderProps,
  type AvatarRootProviderBaseProps,
} from './avatar-root-provider.vue'
export { avatarAnatomy } from './avatar.anatomy'

export * as Avatar from './avatar'
