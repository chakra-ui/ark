import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardInnerArrowProps = HTMLArkProps<'div'>

export const HoverCardInnerArrow = forwardRef<'div', HoverCardInnerArrowProps>((props, ref) => {
  const { innerArrowProps } = useHoverCardContext()
  const mergedProps = mergeProps(innerArrowProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})
