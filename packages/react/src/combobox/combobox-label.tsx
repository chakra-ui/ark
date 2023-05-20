import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useComboboxContext } from './combobox-context'

export type ComboboxLabelProps = HTMLArkProps<'label'>

export const ComboboxLabel = forwardRef<'label'>((props, ref) => {
  const { labelProps } = useComboboxContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})
