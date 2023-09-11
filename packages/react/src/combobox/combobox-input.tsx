import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxInputProps = HtmlArkProps<'input'>

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>((props, ref) => {
  const { inputProps } = useComboboxContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})

ComboboxInput.displayName = 'ComboboxInput'
