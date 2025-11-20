import type { InputProps } from '@zag-js/listbox'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useListboxContext } from './use-listbox-context'

export interface ListboxInputBaseProps extends InputProps, PolymorphicProps {}
export interface ListboxInputProps extends HTMLProps<'input'>, ListboxInputBaseProps {}

const splitInputProps = createSplitProps<InputProps>()

export const ListboxInput = forwardRef<HTMLInputElement, ListboxInputProps>((props, ref) => {
  const [inputProps, localProps] = splitInputProps(props, ['autoHighlight'])
  const listbox = useListboxContext()
  const mergedProps = mergeProps(listbox.getInputProps(inputProps), localProps)

  return <ark.input {...mergedProps} ref={ref} />
})

ListboxInput.displayName = 'ListboxInput'
