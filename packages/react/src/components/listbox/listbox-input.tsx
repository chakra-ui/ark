import type { InputProps } from '@zag-js/listbox'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'

export interface ListboxInputBaseProps extends InputProps, PolymorphicProps {}
export interface ListboxInputProps extends HTMLProps<'input'>, ListboxInputBaseProps {}

export const ListboxInput = forwardRef<HTMLInputElement, ListboxInputProps>((props, ref) => {
  const [inputProps, localProps] = createSplitProps<InputProps>()(props, ['autoHighlight'])
  const listbox = useListboxContext()
  const mergedProps = mergeProps(listbox.getInputProps(inputProps), localProps)

  return <ark.input {...mergedProps} ref={ref} />
})

ListboxInput.displayName = 'ListboxInput'
