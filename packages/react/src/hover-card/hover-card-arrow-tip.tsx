import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardArrowTipProps = HtmlArkProps<'div'>

export const HoverCardArrowTip = forwardRef<HTMLDivElement, HoverCardArrowTipProps>(
  (props, ref) => {
    const { arrowTipProps } = useHoverCardContext()
    const mergedProps = mergeProps(arrowTipProps, props)
    return <ark.div {...mergedProps} ref={ref} />
  },
)

HoverCardArrowTip.displayName = 'HoverCardArrowTip'
