'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'

export interface ComboboxClearTriggerBaseProps extends PolymorphicProps {}
export interface ComboboxClearTriggerProps extends HTMLProps<'button'>, ComboboxClearTriggerBaseProps {}

export const ComboboxClearTrigger = forwardRef<HTMLButtonElement, ComboboxClearTriggerProps>((props, ref) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(combobox.getClearTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

ComboboxClearTrigger.displayName = 'ComboboxClearTrigger'
