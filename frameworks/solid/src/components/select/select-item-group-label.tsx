import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'
import { useSelectItemGroupPropsContext } from './use-select-item-group-props-context'

export interface SelectItemGroupLabelProps extends HTMLArkProps<'div'> {}

export const SelectItemGroupLabel = (props: SelectItemGroupLabelProps) => {
  const select = useSelectContext()
  const itemGroupProps = useSelectItemGroupPropsContext()
  const mergedProps = mergeProps(
    () => select().getItemGroupLabelProps({ htmlFor: itemGroupProps.id }),
    props,
  )

  return <ark.div {...mergedProps} />
}
