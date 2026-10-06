import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useComboboxContext } from './use-combobox-context.ts'
import { useComboboxItemPropsContext } from './use-combobox-item-props-context.ts'

export interface ComboboxItemIndicatorBaseProps extends PolymorphicProps<'span'> {}
export interface ComboboxItemIndicatorProps extends HTMLProps<'span'>, ComboboxItemIndicatorBaseProps {}

export const ComboboxItemIndicator = (props: ComboboxItemIndicatorProps) => {
  const combobox = useComboboxContext()
  const itemProps = useComboboxItemPropsContext()
  const mergedProps = mergeProps(() => combobox().getItemIndicatorProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
