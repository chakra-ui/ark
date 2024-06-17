import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface TooltipTriggerProps extends HTMLProps<'button'>, TooltipTriggerBaseProps {}

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  const api = useTooltipContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
