import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardPositionerProps = HtmlArkProps<'div'>

export const HoverCardPositioner = forwardRef<HTMLDivElement, HoverCardPositionerProps>(
  (props, ref) => {
    const { positionerProps } = useHoverCardContext()
    const mergedProps = mergeProps(positionerProps, props)
    return <ark.div {...mergedProps} ref={ref} />
  },
)

HoverCardPositioner.displayName = 'HoverCardPositioner'
