import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxTriggerProps extends HTMLArkProps<'button'> {}

export const ComboboxTrigger = (props: ComboboxTriggerProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().triggerProps, props)

  return <ark.button {...mergedProps()} />
}
