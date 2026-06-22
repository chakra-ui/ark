import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useListboxContext } from './use-listbox-context.ts'

export interface ListboxListBaseProps extends PolymorphicProps<'div'> {}
export interface ListboxListProps extends HTMLProps<'div'>, ListboxListBaseProps {}

export const ListboxList = (props: ListboxListProps) => {
  const listbox = useListboxContext()
  const mergedProps = mergeProps(() => listbox().getListProps(), props)

  return <ark.div {...mergedProps} />
}
