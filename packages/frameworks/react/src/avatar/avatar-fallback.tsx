import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useAvatarContext } from './avatar-context'

export interface AvatarFallbackProps extends HTMLArkProps<'span'> {}

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>((props, ref) => {
  const api = useAvatarContext()
  const mergedProps = mergeProps(api.fallbackProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

AvatarFallback.displayName = 'AvatarFallback'
