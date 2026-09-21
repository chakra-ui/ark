import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useListboxContext } from './use-listbox-context.ts'
import { useListboxItemPropsContext } from './use-listbox-item-props-context.ts'

export interface ListboxItemTextBaseProps extends PolymorphicProps<'span'> {}
export interface ListboxItemTextProps extends HTMLProps<'span'>, ListboxItemTextBaseProps {}

export const ListboxItemText = (props: ListboxItemTextProps) => {
  const listbox = useListboxContext()
  const itemProps = useListboxItemPropsContext()
  const mergedProps = mergeProps(() => listbox().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
