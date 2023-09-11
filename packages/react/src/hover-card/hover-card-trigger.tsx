import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardTriggerProps = HtmlArkProps<'button'>

export const HoverCardTrigger = forwardRef<HTMLButtonElement, HoverCardTriggerProps>(
  (props, ref) => {
    const { triggerProps } = useHoverCardContext()
    const mergedProps = mergeProps(triggerProps, props)
    return <ark.button {...mergedProps} ref={ref} />
  },
)

HoverCardTrigger.displayName = 'HoverCardTrigger'
