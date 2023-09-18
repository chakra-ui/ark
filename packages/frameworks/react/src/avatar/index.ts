import { Avatar as AvatarRoot, type AvatarProps } from './avatar'
import { useAvatarContext, type AvatarContext } from './avatar-context'
import { AvatarFallback, type AvatarFallbackProps } from './avatar-fallback'
import { AvatarImage, type AvatarImageProps } from './avatar-image'
import { avatarAnatomy } from './avatar.anatomy'

const Avatar = Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  Fallback: AvatarFallback,
  Image: AvatarImage,
})

export { Avatar, AvatarFallback, AvatarImage, avatarAnatomy, useAvatarContext }
export type { AvatarContext, AvatarFallbackProps, AvatarImageProps, AvatarProps }
