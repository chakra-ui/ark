import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardArrowTipProps = HTMLArkProps<'div'>

export const HoverCardArrowTip = forwardRef<'div'>((props, ref) => {
  const { arrowTipProps } = useHoverCardContext()
  const mergedProps = mergeProps(arrowTipProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})
