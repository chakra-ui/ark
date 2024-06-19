import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemGroupPropsContext } from './use-select-item-group-props-context'

export interface SelectItemGroupLabelBaseProps extends PolymorphicProps<'div'> {}
export interface SelectItemGroupLabelProps
  extends HTMLProps<'div'>,
    SelectItemGroupLabelBaseProps {}

export const SelectItemGroupLabel = (props: SelectItemGroupLabelProps) => {
  const select = useSelectContext()
  const itemGroupProps = useSelectItemGroupPropsContext()
  const mergedProps = mergeProps(
    () => select().getItemGroupLabelProps({ htmlFor: itemGroupProps.id }),
    props,
  )

  return <ark.div {...mergedProps} />
}
