import type { TriggerProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'> {}
export interface ComboboxTriggerProps extends HTMLProps<'button'>, ComboboxTriggerBaseProps {}

export const ComboboxTrigger = (props: ComboboxTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<TriggerProps>()(props, ['focusable'])
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} />
}
