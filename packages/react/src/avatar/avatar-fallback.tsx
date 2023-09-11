import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useAvatarContext } from './avatar-context'

export type AvatarFallbackProps = HTMLArkProps<'span'>

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>((props, ref) => {
  const { fallbackProps } = useAvatarContext()
  const mergedProps = mergeProps(fallbackProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

AvatarFallback.displayName = 'AvatarFallback'
