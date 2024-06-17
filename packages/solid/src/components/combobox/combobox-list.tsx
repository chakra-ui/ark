import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxListBaseProps extends PolymorphicProps<'div'> {}
export interface ComboboxListProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ComboboxListBaseProps {}

export const ComboboxList = (props: ComboboxListProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getListProps(), props)

  return <ark.div {...mergedProps} />
}
