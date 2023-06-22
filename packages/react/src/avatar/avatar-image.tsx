import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useAvatarContext } from './avatar-context'

export type AvatarImageProps = HTMLArkProps<'img'>

export const AvatarImage = forwardRef<'img'>((props, ref) => {
  const { imageProps } = useAvatarContext()
  const mergedProps = mergeProps(imageProps, props)

  return <ark.img {...mergedProps} ref={ref} />
})
