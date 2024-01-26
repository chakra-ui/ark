import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export interface ComboboxClearTriggerProps extends HTMLArkProps<'button'> {}

export const ComboboxClearTrigger: ArkComponent<'button'> = (props) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().clearTriggerProps, props)

  return <ark.button {...mergedProps} />
}
