import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import type { Assign } from '../types'
import { usePinInputContext } from './pin-input-context'

export type PinInputFieldProps = Assign<
  ComponentPropsWithoutRef<typeof ark.input>,
  { index: number }
>

export const PinInputField = forwardRef<HTMLInputElement, PinInputFieldProps>((props, ref) => {
  const { index, ...inputProps } = props
  const { getInputProps } = usePinInputContext()
  const mergedProps = mergeProps(getInputProps({ index }), inputProps)

  return <ark.input {...mergedProps} ref={ref} />
})

PinInputField.displayName = 'PinInputField'
