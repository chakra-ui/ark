import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'
import { useListboxItemPropsContext } from './use-listbox-item-props-context'

export interface ListboxItemIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface ListboxItemIndicatorProps extends HTMLProps<'div'>, ListboxItemIndicatorBaseProps {}

export const ListboxItemIndicator = (props: ListboxItemIndicatorProps) => {
  const listbox = useListboxContext()
  const itemProps = useListboxItemPropsContext()
  const mergedProps = mergeProps(() => listbox().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
