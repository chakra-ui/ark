import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxClearTriggerProps = HTMLArkProps<'button'>

export const ComboboxClearTrigger = (props: ComboboxClearTriggerProps) => {
  const combobox = useComboboxContext()
  const clearTriggerProps = mergeProps(() => combobox().clearTriggerProps, props)
  return <ark.button {...clearTriggerProps} />
}
