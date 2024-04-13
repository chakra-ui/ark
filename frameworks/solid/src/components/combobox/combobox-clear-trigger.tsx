import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxClearTriggerProps extends HTMLArkProps<'button'> {}

export const ComboboxClearTrigger = (props: ComboboxClearTriggerProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().clearTriggerProps, props)

  return <ark.button {...mergedProps} />
}
