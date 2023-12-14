import { useAvatarContext, type AvatarContext } from './avatar-context'
import { AvatarFallback, type AvatarFallbackProps } from './avatar-fallback'
import { AvatarImage, type AvatarImageProps } from './avatar-image'
import { AvatarRoot, type AvatarRootProps } from './avatar.root'

const Avatar = {
  Root: AvatarRoot,
  Fallback: AvatarFallback,
  Image: AvatarImage,
}

export { Avatar, AvatarFallback, AvatarImage, AvatarRoot, useAvatarContext }
export type { AvatarContext, AvatarFallbackProps, AvatarImageProps, AvatarRootProps }
