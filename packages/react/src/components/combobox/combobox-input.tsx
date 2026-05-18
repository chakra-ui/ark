'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldContext } from '../field/index.ts'
import { useComboboxContext } from './use-combobox-context.ts'

export interface ComboboxInputBaseProps extends PolymorphicProps {}
export interface ComboboxInputProps extends HTMLProps<'input'>, ComboboxInputBaseProps {}

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>((props, ref) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(combobox.getInputProps(), props)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
})

ComboboxInput.displayName = 'ComboboxInput'
