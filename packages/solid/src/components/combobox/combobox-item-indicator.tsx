import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemPropsContext } from './use-combobox-item-props-context'

export interface ComboboxItemIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface ComboboxItemIndicatorProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ComboboxItemIndicatorBaseProps {}

export const ComboboxItemIndicator = (props: ComboboxItemIndicatorProps) => {
  const combobox = useComboboxContext()
  const itemProps = useComboboxItemPropsContext()
  const mergedProps = mergeProps(() => combobox().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
