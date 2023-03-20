import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxInputProps = HTMLArkProps<'input'>

export const ComboboxInput = (props: ComboboxInputProps) => {
  const combobox = useComboboxContext()

  return <ark.input {...combobox().inputProps} {...props} />
}
