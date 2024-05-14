import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useAvatarContext } from './use-avatar-context'

export interface AvatarFallbackProps extends HTMLArkProps<'span'> {}

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>((props, ref) => {
  const avatar = useAvatarContext()
  const mergedProps = mergeProps(avatar.fallbackProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

AvatarFallback.displayName = 'AvatarFallback'
