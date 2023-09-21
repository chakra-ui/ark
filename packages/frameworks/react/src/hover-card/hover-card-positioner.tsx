import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardPositionerProps extends HTMLArkProps<'div'> {}

export const HoverCardPositioner = forwardRef<HTMLDivElement, HoverCardPositionerProps>(
  (props, ref) => {
    const api = useHoverCardContext()
    const mergedProps = mergeProps(api.positionerProps, props)
    return <ark.div {...mergedProps} ref={ref} />
  },
)

HoverCardPositioner.displayName = 'HoverCardPositioner'
