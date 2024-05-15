import type { TriggerProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxTriggerProps extends Assign<HTMLArkProps<'button'>, TriggerProps> {}

export const ComboboxTrigger = (props: ComboboxTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<TriggerProps>()(props, ['focusable'])
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} />
}
