import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useAvatarContext } from './avatar-context'

export interface AvatarImageProps extends HTMLArkProps<'img'> {}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>((props, ref) => {
  const api = useAvatarContext()
  const mergedProps = mergeProps(api.imageProps, props)

  return <ark.img {...mergedProps} ref={ref} />
})

AvatarImage.displayName = 'AvatarImage'
