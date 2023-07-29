import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useAvatarContext } from './avatar-context'

export type AvatarImageProps = ComponentPropsWithoutRef<typeof ark.img>

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>((props, ref) => {
  const { imageProps } = useAvatarContext()
  const mergedProps = mergeProps(imageProps, props)

  return <ark.img {...mergedProps} ref={ref} />
})

AvatarImage.displayName = 'AvatarImage'
