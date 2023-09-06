import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxInputProps = ComponentPropsWithoutRef<typeof ark.input>

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>((props, ref) => {
  const api = useComboboxContext()
  const mergedProps = mergeProps(api.inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})

ComboboxInput.displayName = 'ComboboxInput'
