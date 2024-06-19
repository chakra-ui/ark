import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxControlBaseProps extends PolymorphicProps<'div'> {}
export interface ComboboxControlProps extends HTMLProps<'div'>, ComboboxControlBaseProps {}

export const ComboboxControl = (props: ComboboxControlProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
