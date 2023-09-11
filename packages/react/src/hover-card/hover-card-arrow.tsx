import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardArrowProps = HtmlArkProps<'div'>

export const HoverCardArrow = forwardRef<HTMLDivElement, HoverCardArrowProps>((props, ref) => {
  const { arrowProps } = useHoverCardContext()
  const mergedProps = mergeProps(arrowProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})

HoverCardArrow.displayName = 'HoverCardArrow'
