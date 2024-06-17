import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxLabelBaseProps extends PolymorphicProps<'label'> {}
export interface ComboboxLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    ComboboxLabelBaseProps {}

export const ComboboxLabel = (props: ComboboxLabelProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
