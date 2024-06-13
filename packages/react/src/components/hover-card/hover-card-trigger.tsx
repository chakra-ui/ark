import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export type HoverCardTriggerBaseProps = {}
export interface HoverCardTriggerProps extends HTMLArkProps<'button'>, HoverCardTriggerBaseProps {}

export const HoverCardTrigger = forwardRef<HTMLButtonElement, HoverCardTriggerProps>(
  (props, ref) => {
    const hoverCard = useHoverCardContext()
    const mergedProps = mergeProps(hoverCard.getTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

HoverCardTrigger.displayName = 'HoverCardTrigger'
