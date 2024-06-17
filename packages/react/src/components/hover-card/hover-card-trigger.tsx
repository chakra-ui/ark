import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardTriggerBaseProps extends PolymorphicProps {}
export interface HoverCardTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    HoverCardTriggerBaseProps {}

export const HoverCardTrigger = forwardRef<HTMLButtonElement, HoverCardTriggerProps>(
  (props, ref) => {
    const hoverCard = useHoverCardContext()
    const mergedProps = mergeProps(hoverCard.getTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

HoverCardTrigger.displayName = 'HoverCardTrigger'
