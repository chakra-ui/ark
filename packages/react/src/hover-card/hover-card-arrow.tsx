import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardArrowProps = HTMLArkProps<'div'>

export const HoverCardArrow = forwardRef<'div'>((props, ref) => {
  const { arrowProps } = useHoverCardContext()
  const mergedProps = mergeProps(arrowProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})
