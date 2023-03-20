import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxControlProps = HTMLArkProps<'div'>

export const ComboboxControl = (props: ComboboxControlProps) => {
  const combobox = useComboboxContext()

  return <ark.div {...combobox().controlProps} {...props} />
}
