import { mergeProps } from '@zag-js/solid'
import type { TriggerProps, TriggerState } from '@zag-js/tooltip'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTooltipContext } from './use-tooltip-context.ts'

export interface TooltipTriggerState extends TriggerState {}

export interface TooltipTriggerBaseProps extends TriggerProps, PolymorphicProps<'button', TooltipTriggerState> {}
export interface TooltipTriggerProps extends Assign<HTMLProps<'button'>, TooltipTriggerBaseProps> {}

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<TriggerProps>()(props, ['value'])
  const api = useTooltipContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} state={api().getTriggerState(triggerProps)} />
}
