'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useTooltipContext } from './use-tooltip-context.ts'

export interface TooltipContentBaseProps extends PolymorphicProps {}
export interface TooltipContentProps extends HTMLProps<'div'>, TooltipContentBaseProps {}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>((props, ref) => {
  const tooltip = useTooltipContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(tooltip.getContentProps(), presence.getPresenceProps(), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />
})

TooltipContent.displayName = 'TooltipContent'
