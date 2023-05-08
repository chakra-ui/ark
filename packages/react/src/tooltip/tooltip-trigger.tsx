import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useTooltipContext } from './tooltip-context'

export type TooltipTriggerProps = HTMLArkProps<'button'>

export const TooltipTrigger = forwardRef<'button'>((props, ref) => {
  const { triggerProps } = useTooltipContext()
  const mergedProps = mergeProps(triggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
