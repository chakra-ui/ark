export type { StatusChangeDetails as AvatarStatusChangeDetails } from '@zag-js/avatar'
export { default as AvatarContext, type AvatarContextProps } from './avatar-context.vue'
export { default as AvatarFallback, type AvatarFallbackProps } from './avatar-fallback.vue'
export { default as AvatarImage, type AvatarImageProps } from './avatar-image.vue'
export {
  default as AvatarRoot,
  type AvatarRootEmits,
  type AvatarRootProps,
} from './avatar-root.vue'
export { useAvatarContext, type UseAvatarContext } from './use-avatar-context'

export * as Avatar from './avatar'
