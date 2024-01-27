import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export interface ComboboxInputProps extends HTMLArkProps<'input'> {}

export const ComboboxInput: ArkComponent<'input'> = (props: ComboboxInputProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().inputProps, props)

  return <ark.input {...mergedProps} />
}
