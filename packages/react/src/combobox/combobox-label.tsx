import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxLabelProps = HtmlArkProps<'label'>

export const ComboboxLabel = forwardRef<HTMLLabelElement, ComboboxLabelProps>((props, ref) => {
  const { labelProps } = useComboboxContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

ComboboxLabel.displayName = 'ComboboxLabel'
