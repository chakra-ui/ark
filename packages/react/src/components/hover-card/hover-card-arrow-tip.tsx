import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardArrowTipBaseProps extends PolymorphicProps {}
export interface HoverCardArrowTipProps
  extends HTMLAttributes<HTMLDivElement>,
    HoverCardArrowTipBaseProps {}

export const HoverCardArrowTip = forwardRef<HTMLDivElement, HoverCardArrowTipProps>(
  (props, ref) => {
    const hoverCard = useHoverCardContext()
    const mergedProps = mergeProps(hoverCard.getArrowTipProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

HoverCardArrowTip.displayName = 'HoverCardArrowTip'
