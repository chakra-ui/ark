import { Avatar as ArkAvatar } from '@ark-ui/react/src/avatar'
import { styled, type HTMLStyledProps } from 'styled-system/jsx'
import { avatar } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(avatar)

export const AvatarRoot = withProvider(styled(ArkAvatar.Root), 'root')
export const AvatarFallback = withContext(styled(ArkAvatar.Fallback), 'fallback')
export const AvatarImage = withContext(styled(ArkAvatar.Image), 'image')

export const Avatar = {
  Root: AvatarRoot,
  Fallback: AvatarFallback,
  Image: AvatarImage,
}

export interface AvatarProps extends HTMLStyledProps<typeof AvatarRoot> {}
export interface AvatarFallbackProps extends HTMLStyledProps<typeof AvatarFallback> {}
export interface AvatarImageProps extends HTMLStyledProps<typeof AvatarImage> {}
