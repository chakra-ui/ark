import { ark, HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxContentProps = HTMLArkProps<'ul'>

export const ComboboxContent = (props: ComboboxContentProps) => {
  const combobox = useComboboxContext()

  return <ark.ul {...combobox().contentProps} {...props} />
}
