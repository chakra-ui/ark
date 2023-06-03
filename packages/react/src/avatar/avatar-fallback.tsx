import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useAvatarContext } from './avatar-context'

export type AvatarFallbackProps = HTMLArkProps<'span'>

export const AvatarFallback = forwardRef<'span'>((props, ref) => {
  const { fallbackProps } = useAvatarContext()
  const mergedProps = mergeProps(fallbackProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})
