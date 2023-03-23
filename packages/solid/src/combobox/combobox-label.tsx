import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxLabelProps = HTMLArkProps<'label'>

export const ComboboxLabel = (props: ComboboxLabelProps) => {
  const combobox = useComboboxContext()

  return <ark.label {...combobox().labelProps} {...props} />
}
