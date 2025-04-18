import { mergeProps } from '@zag-js/solid'
import { children } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'

export interface ListboxValueTextBaseProps extends PolymorphicProps<'span'> {
  /**
   * Text to display when no value is selected.
   */
  placeholder?: string
}
export interface ListboxValueTextProps extends HTMLProps<'span'>, ListboxValueTextBaseProps {}

export const ListboxValueText = (props: ListboxValueTextProps) => {
  const { placeholder, ...localprops } = props
  const listbox = useListboxContext()
  const mergedProps = mergeProps(() => listbox().getValueTextProps(), localprops)
  const resolved = children(() => props.children)

  return <ark.span {...mergedProps}>{resolved() || listbox().valueAsString || placeholder}</ark.span>
}
