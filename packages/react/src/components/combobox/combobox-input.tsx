import { mergeProps } from '@zag-js/react'
import { type InputHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxInputBaseProps extends PolymorphicProps {}
export interface ComboboxInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    ComboboxInputBaseProps {}

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>((props, ref) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(combobox.getInputProps(), props)

  return <ark.input {...mergedProps} ref={ref} />
})

ComboboxInput.displayName = 'ComboboxInput'
