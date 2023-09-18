import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxTriggerProps = HTMLArkProps<'button'>

export const ComboboxTrigger = (props: ComboboxTriggerProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().triggerProps, props)

  return <ark.button {...mergedProps} />
}
