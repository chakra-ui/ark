import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardTriggerProps extends HTMLArkProps<'button'> {}

export const HoverCardTrigger = forwardRef<HTMLButtonElement, HoverCardTriggerProps>(
  (props, ref) => {
    const hoverCard = useHoverCardContext()
    const mergedProps = mergeProps(hoverCard.triggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

HoverCardTrigger.displayName = 'HoverCardTrigger'
