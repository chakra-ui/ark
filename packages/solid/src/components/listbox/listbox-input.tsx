import type { InputProps } from '@zag-js/listbox'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'

export interface ListboxInputBaseProps extends InputProps, PolymorphicProps<'input'> {}
export interface ListboxInputProps extends HTMLProps<'input'>, ListboxInputBaseProps {}

export const ListboxInput = (props: ListboxInputProps) => {
  const [inputProps, localProps] = createSplitProps<InputProps>()(props, ['autoHighlight'])
  const listbox = useListboxContext()
  const mergedProps = mergeProps(() => listbox().getInputProps(inputProps), localProps)

  return <ark.input {...mergedProps} />
}
