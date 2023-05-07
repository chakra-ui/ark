import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxInputProps = HTMLArkProps<'input'>

export const ComboboxInput = (props: ComboboxInputProps) => {
  const combobox = useComboboxContext()
  const inputProps = mergeProps(() => combobox().inputProps, props)
  return <ark.input {...inputProps} />
}
