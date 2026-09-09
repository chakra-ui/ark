import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useCollapsibleContext } from './use-collapsible-context.ts'
import type { TriggerState } from '@zag-js/collapsible'

export interface CollapsibleTriggerState extends TriggerState {}

export interface CollapsibleTriggerBaseProps extends PolymorphicProps<'button', CollapsibleTriggerState> {}
export interface CollapsibleTriggerProps extends HTMLProps<'button'>, CollapsibleTriggerBaseProps {}

export const CollapsibleTrigger = (props: CollapsibleTriggerProps) => {
  const api = useCollapsibleContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(), props)
  return <ark.button {...mergedProps} state={api().getTriggerState()} />
}
