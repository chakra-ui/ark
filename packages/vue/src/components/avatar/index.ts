export type { StatusChangeDetails as AvatarStatusChangeDetails } from '@zag-js/avatar'
export { default as AvatarContext, type AvatarContextProps } from './avatar-context.vue'
export {
  default as AvatarFallback,
  type AvatarFallbackBaseProps,
  type AvatarFallbackProps,
} from './avatar-fallback.vue'
export {
  default as AvatarImage,
  type AvatarImageBaseProps,
  type AvatarImageProps,
} from './avatar-image.vue'
export {
  default as AvatarRootProvider,
  type AvatarRootProviderBaseProps,
  type AvatarRootProviderProps,
} from './avatar-root-provider.vue'
export {
  default as AvatarRoot,
  type AvatarRootBaseProps,
  type AvatarRootEmits,
  type AvatarRootProps,
} from './avatar-root.vue'
export { avatarAnatomy } from './avatar.anatomy'
export { useAvatar, type UseAvatarProps, type UseAvatarReturn } from './use-avatar'
export { useAvatarContext, type UseAvatarContext } from './use-avatar-context'

export * as Avatar from './avatar'
