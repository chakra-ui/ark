import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export type HoverCardArrowBaseProps = {}
export interface HoverCardArrowProps extends HTMLArkProps<'div'>, HoverCardArrowBaseProps {}

export const HoverCardArrow = forwardRef<HTMLDivElement, HoverCardArrowProps>((props, ref) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(hoverCard.getArrowProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

HoverCardArrow.displayName = 'HoverCardArrow'
