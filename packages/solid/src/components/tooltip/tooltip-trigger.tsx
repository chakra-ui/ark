import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipTriggerProps extends HTMLArkProps<'button'> {}

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  const api = useTooltipContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
