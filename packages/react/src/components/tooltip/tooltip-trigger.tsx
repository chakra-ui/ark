import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipTriggerBaseProps extends PolymorphicProps {}
export interface TooltipTriggerProps extends HTMLProps<'button'>, TooltipTriggerBaseProps {}

export const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>((props, ref) => {
  const tooltip = useTooltipContext()
  const mergedProps = mergeProps(tooltip.getTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

TooltipTrigger.displayName = 'TooltipTrigger'
