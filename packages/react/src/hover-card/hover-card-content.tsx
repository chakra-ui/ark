import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardContentProps = HTMLArkProps<'div'>

export const HoverCardContent = forwardRef<'div'>((props, ref) => {
  const { contentProps } = useHoverCardContext()
  const mergedProps = mergeProps(contentProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})
