import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export interface ComboboxInputProps extends HTMLArkProps<'input'> {}

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>((props, ref) => {
  const api = useComboboxContext()
  const mergedProps = mergeProps(api.inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})

ComboboxInput.displayName = 'ComboboxInput'
