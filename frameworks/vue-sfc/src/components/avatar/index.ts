import type { StatusChangeDetails as AvatarStatusChangeDetails } from '@zag-js/avatar'
import AvatarContext from './avatar-context.vue'
import AvatarFallback from './avatar-fallback.vue'
import AvatarImage from './avatar-image.vue'
import AvatarRoot, { type AvatarRootEmits, type AvatarRootProps } from './avatar-root.vue'
import { type UseAvatarContext, useAvatarContext } from './use-avatar-context'

export * as Avatar from './avatar'

export { AvatarContext, AvatarFallback, AvatarImage, AvatarRoot, useAvatarContext }
export type { AvatarRootEmits, AvatarRootProps, AvatarStatusChangeDetails, UseAvatarContext }
