'use client'

import { mergeProps } from '@zag-js/react'
import type { TriggerProps } from '@zag-js/tooltip'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface TooltipTriggerProps extends Assign<HTMLProps<'button'>, TooltipTriggerBaseProps> {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const TooltipTrigger = ({ ref, ...props }: TooltipTriggerProps) => {
  const [triggerProps, localProps] = splitTriggerProps(props, ['value'])
  const tooltip = useTooltipContext()
  const mergedProps = mergeProps(tooltip.getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
}

TooltipTrigger.displayName = 'TooltipTrigger'
