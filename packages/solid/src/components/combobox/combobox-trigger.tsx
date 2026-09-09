import type { TriggerProps, TriggerState } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useComboboxContext } from './use-combobox-context.ts'

export interface ComboboxTriggerState extends TriggerState {}

export interface ComboboxTriggerBaseProps extends TriggerProps, PolymorphicProps<'button', ComboboxTriggerState> {}
export interface ComboboxTriggerProps extends HTMLProps<'button'>, ComboboxTriggerBaseProps {}

export const ComboboxTrigger = (props: ComboboxTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<TriggerProps>()(props, ['focusable'])
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} state={combobox().getTriggerState(triggerProps)} />
}
