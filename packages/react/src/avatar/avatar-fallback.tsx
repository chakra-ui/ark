import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useAvatarContext } from './avatar-context'

export type AvatarFallbackProps = ComponentPropsWithoutRef<typeof ark.span>

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>((props, ref) => {
  const { fallbackProps } = useAvatarContext()
  const mergedProps = mergeProps(fallbackProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

AvatarFallback.displayName = 'AvatarFallback'
