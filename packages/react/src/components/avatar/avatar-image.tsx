import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAvatarContext } from './use-avatar-context'

export interface AvatarImageBaseProps extends PolymorphicProps {}
export interface AvatarImageProps extends HTMLProps<'img'>, AvatarImageBaseProps {}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>((props, ref) => {
  const avatar = useAvatarContext()
  const mergedProps = mergeProps(avatar.getImageProps(), props)

  return <ark.img {...mergedProps} ref={ref} />
})

AvatarImage.displayName = 'AvatarImage'
