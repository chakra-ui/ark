import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export type ComboboxControlBaseProps = {}
export interface ComboboxControlProps extends HTMLArkProps<'div'>, ComboboxControlBaseProps {}

export const ComboboxControl = forwardRef<HTMLDivElement, ComboboxControlProps>((props, ref) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(combobox.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ComboboxControl.displayName = 'ComboboxControl'
