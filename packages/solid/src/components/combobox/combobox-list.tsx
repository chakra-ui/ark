import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxListBaseProps extends PolymorphicProps<'div'> {}
export interface ComboboxListProps extends HTMLProps<'div'>, ComboboxListBaseProps {}

export const ComboboxList = (props: ComboboxListProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getListProps(), props)

  return <ark.div {...mergedProps} />
}
