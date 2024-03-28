import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useAvatarContext } from './use-avatar-context'

export interface AvatarFallbackProps extends HTMLArkProps<'span'> {}

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>((props, ref) => {
  const context = useAvatarContext()
  const mergedProps = mergeProps(context.fallbackProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

AvatarFallback.displayName = 'AvatarFallback'
