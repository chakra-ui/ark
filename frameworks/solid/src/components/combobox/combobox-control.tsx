import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxControlProps extends HTMLArkProps<'div'> {}

export const ComboboxControl = (props: ComboboxControlProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().controlProps, props)

  return <ark.div {...mergedProps} />
}
