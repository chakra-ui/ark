import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemGroupPropsContext } from './use-combobox-item-group-props-context'

export interface ComboboxItemGroupLabelBaseProps extends PolymorphicProps<'div'> {}
export interface ComboboxItemGroupLabelProps
  extends HTMLProps<'div'>,
    ComboboxItemGroupLabelBaseProps {}

export const ComboboxItemGroupLabel = (props: ComboboxItemGroupLabelProps) => {
  const combobox = useComboboxContext()
  const itemGroupProps = useComboboxItemGroupPropsContext()
  const mergedProps = mergeProps(
    () => combobox().getItemGroupLabelProps({ htmlFor: itemGroupProps.id }),
    props,
  )

  return <ark.div {...mergedProps} />
}
