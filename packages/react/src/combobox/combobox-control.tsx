import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxControlProps = HTMLArkProps<'div'>

export const ComboboxControl = forwardRef<HTMLDivElement, ComboboxControlProps>((props, ref) => {
  const { controlProps } = useComboboxContext()
  const mergedProps = mergeProps(controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

ComboboxControl.displayName = 'ComboboxControl'
