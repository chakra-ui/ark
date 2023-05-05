import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useComboboxContext } from './combobox-context'

export type ComboboxInputProps = HTMLArkProps<'input'>

export const ComboboxInput = forwardRef<'input'>((props, ref) => {
  const { inputProps } = useComboboxContext()
  const mergedProps = mergeProps(inputProps, props)

  return <ark.input {...mergedProps} ref={ref} />
})
