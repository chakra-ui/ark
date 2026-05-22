'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxClearTriggerBaseProps extends PolymorphicProps {}
export interface ComboboxClearTriggerProps extends HTMLProps<'button'>, ComboboxClearTriggerBaseProps {}

export const ComboboxClearTrigger = ({ ref, ...props }: ComboboxClearTriggerProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(combobox.getClearTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

ComboboxClearTrigger.displayName = 'ComboboxClearTrigger'
