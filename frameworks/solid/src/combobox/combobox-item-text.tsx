import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemPropsContext } from './use-combobox-item-context'

export interface ComboboxItemTextProps extends HTMLArkProps<'span'> {}

export const ComboboxItemText = (props: ComboboxItemTextProps) => {
  const api = useComboboxContext()
  const itemProps = useComboboxItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
