import type { StatusChangeDetails as AvatarStatusChangeDetails } from '@zag-js/avatar'
import AvatarFallback from './avatar-fallback.vue'
import AvatarImage from './avatar-image.vue'
import AvatarRoot, { type AvatarRootEmits, type AvatarRootProps } from './avatar-root.vue'
import { type UseAvatarContext, useAvatarContext } from './use-avatar-context'

export { AvatarFallback, AvatarImage, AvatarRoot, useAvatarContext }

export type { AvatarRootEmits, AvatarRootProps, AvatarStatusChangeDetails, UseAvatarContext }
