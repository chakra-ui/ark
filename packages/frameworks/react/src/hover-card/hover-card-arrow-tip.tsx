import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardArrowTipProps extends HTMLArkProps<'div'> {}

export const HoverCardArrowTip = forwardRef<HTMLDivElement, HoverCardArrowTipProps>(
  (props, ref) => {
    const api = useHoverCardContext()
    const mergedProps = mergeProps(api.arrowTipProps, props)
    return <ark.div {...mergedProps} ref={ref} />
  },
)

HoverCardArrowTip.displayName = 'HoverCardArrowTip'
