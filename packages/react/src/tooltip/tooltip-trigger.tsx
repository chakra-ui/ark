import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipTriggerProps = HtmlArkProps<'button'>

export const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>((props, ref) => {
  const { triggerProps } = useTooltipContext()
  const mergedProps = mergeProps(triggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

TooltipTrigger.displayName = 'TooltipTrigger'
