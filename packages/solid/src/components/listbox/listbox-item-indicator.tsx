import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useListboxContext } from './use-listbox-context.ts'
import { useListboxItemPropsContext } from './use-listbox-item-props-context.ts'

export interface ListboxItemIndicatorBaseProps extends PolymorphicProps<'span'> {}
export interface ListboxItemIndicatorProps extends HTMLProps<'span'>, ListboxItemIndicatorBaseProps {}

export const ListboxItemIndicator = (props: ListboxItemIndicatorProps) => {
  const listbox = useListboxContext()
  const itemProps = useListboxItemPropsContext()
  const mergedProps = mergeProps(() => listbox().getItemIndicatorProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
