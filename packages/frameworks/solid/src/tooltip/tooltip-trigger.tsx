import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipTriggerProps = HTMLArkProps<'button'>

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  const api = useTooltipContext()
  const triggerProps = mergeProps(() => api().triggerProps, props)
  return <ark.button {...triggerProps} />
}
