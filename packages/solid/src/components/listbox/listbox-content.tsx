import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'

export interface ListboxContentBaseProps extends PolymorphicProps<'div'> {}
export interface ListboxContentProps extends HTMLProps<'div'>, ListboxContentBaseProps {}

export const ListboxContent = (props: ListboxContentProps) => {
  const listbox = useListboxContext()
  const mergedProps = mergeProps(() => listbox().getContentProps(), props)

  return <ark.div {...mergedProps} />
}
