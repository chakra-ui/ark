import { mergeProps } from '@zag-js/react'
import { type ImgHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useAvatarContext } from './use-avatar-context'

export interface AvatarImageBaseProps extends PolymorphicProps {}
export interface AvatarImageProps
  extends ImgHTMLAttributes<HTMLImageElement>,
    AvatarImageBaseProps {}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>((props, ref) => {
  const avatar = useAvatarContext()
  const mergedProps = mergeProps(avatar.getImageProps(), props)

  return <ark.img {...mergedProps} ref={ref} />
})

AvatarImage.displayName = 'AvatarImage'
