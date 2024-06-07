import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxListProps extends HTMLArkProps<'div'> {}

export const ComboboxList = (props: ComboboxListProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getListProps(), props)

  return <ark.div {...mergedProps} />
}
