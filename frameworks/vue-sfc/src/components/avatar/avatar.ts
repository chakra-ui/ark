import type { StatusChangeDetails } from '@zag-js/avatar'
import Context from './avatar-context.vue'
import Fallback from './avatar-fallback.vue'
import Image from './avatar-image.vue'
import Root, {
  type AvatarRootEmits as RootEmits,
  type AvatarRootProps as RootProps,
} from './avatar-root.vue'

export { Context, Fallback, Image, Root }
export type { RootEmits, RootProps, StatusChangeDetails }
