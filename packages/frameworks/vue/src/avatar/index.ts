// import { Avatar as AvatarRoot, type AvatarProps } from './avatar'
import AvatarRoot from './AvatarRoot.vue'
// import { AvatarFallback, type AvatarFallbackProps } from './avatar-fallback'
import AvatarFallback from './AvatarFallback.vue'
// import { AvatarImage, type AvatarImageProps } from './avatar-image'
import AvatarImage from './AvatarImage.vue'

import { useAvatarContext, type AvatarContext } from './avatar-context'
import type { AvatarFallbackProps, AvatarImageProps, AvatarRootProps } from './avatar.props'

const Avatar = Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  Fallback: AvatarFallback,
  Image: AvatarImage,
})

export { Avatar, AvatarFallback, AvatarImage, useAvatarContext }
export type { AvatarContext, AvatarFallbackProps, AvatarImageProps, AvatarRootProps }
