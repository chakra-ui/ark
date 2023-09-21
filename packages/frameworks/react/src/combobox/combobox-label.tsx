import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export interface ComboboxLabelProps extends HTMLArkProps<'label'> {}

export const ComboboxLabel = forwardRef<HTMLLabelElement, ComboboxLabelProps>((props, ref) => {
  const api = useComboboxContext()
  const mergedProps = mergeProps(api.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

ComboboxLabel.displayName = 'ComboboxLabel'
