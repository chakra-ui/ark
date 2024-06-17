import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardArrowBaseProps extends PolymorphicProps {}
export interface HoverCardArrowProps
  extends HTMLAttributes<HTMLDivElement>,
    HoverCardArrowBaseProps {}

export const HoverCardArrow = forwardRef<HTMLDivElement, HoverCardArrowProps>((props, ref) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(hoverCard.getArrowProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

HoverCardArrow.displayName = 'HoverCardArrow'
