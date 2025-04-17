import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'

export interface ListboxLabelBaseProps extends PolymorphicProps<'label'> {}
export interface ListboxLabelProps extends HTMLProps<'label'>, ListboxLabelBaseProps {}

export const ListboxLabel = (props: ListboxLabelProps) => {
  const listbox = useListboxContext()
  const mergedProps = mergeProps(() => listbox().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
