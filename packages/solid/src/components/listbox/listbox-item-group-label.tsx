import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'
import { useListboxItemGroupPropsContext } from './use-listbox-item-group-props-context'

export interface ListboxItemGroupLabelBaseProps extends PolymorphicProps<'div'> {}
export interface ListboxItemGroupLabelProps extends HTMLProps<'div'>, ListboxItemGroupLabelBaseProps {}

export const ListboxItemGroupLabel = (props: ListboxItemGroupLabelProps) => {
  const listbox = useListboxContext()
  const itemGroupProps = useListboxItemGroupPropsContext()
  const mergedProps = mergeProps(() => listbox().getItemGroupLabelProps({ htmlFor: itemGroupProps.id }), props)

  return <ark.div {...mergedProps} />
}
