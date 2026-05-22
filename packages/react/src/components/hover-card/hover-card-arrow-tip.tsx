'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardArrowTipBaseProps extends PolymorphicProps {}
export interface HoverCardArrowTipProps extends HTMLProps<'div'>, HoverCardArrowTipBaseProps {}

export const HoverCardArrowTip = ({ ref, ...props }: HoverCardArrowTipProps) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(hoverCard.getArrowTipProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

HoverCardArrowTip.displayName = 'HoverCardArrowTip'
