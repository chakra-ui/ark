import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxInputBaseProps extends PolymorphicProps {}
export interface ComboboxInputProps extends HTMLProps<'input'>, ComboboxInputBaseProps {}

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>((props, ref) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(combobox.getInputProps(), props)

  return <ark.input {...mergedProps} ref={ref} />
})

ComboboxInput.displayName = 'ComboboxInput'
