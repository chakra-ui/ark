import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxControlProps extends HTMLArkProps<'div'> {}

export const ComboboxControl = forwardRef<HTMLDivElement, ComboboxControlProps>((props, ref) => {
  const context = useComboboxContext()
  const mergedProps = mergeProps(context.controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

ComboboxControl.displayName = 'ComboboxControl'
