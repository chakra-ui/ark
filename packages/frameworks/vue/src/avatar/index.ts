// import { Avatar as AvatarRoot, type AvatarProps } from './avatar'
import AvatarRoot, { type AvatarProps } from './AvatarRoot.vue'
import { useAvatarContext, type AvatarContext } from './avatar-context'
// import { AvatarFallback, type AvatarFallbackProps } from './avatar-fallback'
import AvatarFallback, { type AvatarFallbackProps } from './AvatarFallback.vue'
// import { AvatarImage, type AvatarImageProps } from './avatar-image'
import AvatarImage, { type AvatarImageProps } from './AvatarImage.vue'

const Avatar = Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  Fallback: AvatarFallback,
  Image: AvatarImage,
})

export { Avatar, AvatarFallback, AvatarImage, useAvatarContext }
export type { AvatarContext, AvatarFallbackProps, AvatarImageProps, AvatarProps }
