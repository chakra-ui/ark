import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxInputBaseProps extends PolymorphicProps<'input'> {}
export interface ComboboxInputProps extends HTMLProps<'input'>, ComboboxInputBaseProps {}

export const ComboboxInput = (props: ComboboxInputProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getInputProps(), props)

  return <ark.input {...mergedProps} />
}
