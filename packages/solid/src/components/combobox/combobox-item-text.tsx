import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemPropsContext } from './use-combobox-item-props-context'

export interface ComboboxItemTextBaseProps extends PolymorphicProps<'span'> {}
export interface ComboboxItemTextProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    ComboboxItemTextBaseProps {}

export const ComboboxItemText = (props: ComboboxItemTextProps) => {
  const api = useComboboxContext()
  const itemProps = useComboboxItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
