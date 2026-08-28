import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useListboxContext } from './use-listbox-context.ts'

export interface ListboxLabelBaseProps extends PolymorphicProps<'span'> {}
export interface ListboxLabelProps extends HTMLProps<'span'>, ListboxLabelBaseProps {}

export const ListboxLabel = (props: ListboxLabelProps) => {
  const listbox = useListboxContext()
  const mergedProps = mergeProps(() => listbox().getLabelProps(), props)

  return <ark.span {...mergedProps} />
}
