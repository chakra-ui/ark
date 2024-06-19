import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useAvatarContext } from './use-avatar-context'

export interface AvatarFallbackBaseProps extends PolymorphicProps {}
export interface AvatarFallbackProps extends HTMLProps<'span'>, AvatarFallbackBaseProps {}

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>((props, ref) => {
  const avatar = useAvatarContext()
  const mergedProps = mergeProps(avatar.getFallbackProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

AvatarFallback.displayName = 'AvatarFallback'
