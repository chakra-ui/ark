import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxControlProps = HTMLArkProps<'div'>

export const ComboboxControl = forwardRef<'div', ComboboxControlProps>((props, ref) => {
  const { controlProps } = useComboboxContext()
  const mergedProps = mergeProps(controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
