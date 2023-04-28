import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardArrowTipProps = HTMLArkProps<'div'>

export const HoverCardArrowTip = forwardRef<'div', HoverCardArrowTipProps>((props, ref) => {
  const { arrowTipProps } = useHoverCardContext()
  const mergedProps = mergeProps(arrowTipProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})
