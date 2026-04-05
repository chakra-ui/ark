import { mergeProps } from '@zag-js/solid'
import type { TriggerProps } from '@zag-js/tooltip'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'> {}
export interface TooltipTriggerProps extends Assign<HTMLProps<'button'>, TooltipTriggerBaseProps> {}

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<TriggerProps>()(props, ['value'])
  const api = useTooltipContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} />
}
