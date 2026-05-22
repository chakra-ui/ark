'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxControlBaseProps extends PolymorphicProps {}
export interface ComboboxControlProps extends HTMLProps<'div'>, ComboboxControlBaseProps {}

export const ComboboxControl = ({ ref, ...props }: ComboboxControlProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(combobox.getControlProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

ComboboxControl.displayName = 'ComboboxControl'
