import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePinInputContext } from './pin-input-context'

export interface PinInputInputProps extends Assign<HTMLArkProps<'input'>, { index: number }> {}

export const PinInputInput = forwardRef<HTMLInputElement, PinInputInputProps>((props, ref) => {
  const { index, ...inputProps } = props
  const api = usePinInputContext()
  const mergedProps = mergeProps(api.getInputProps({ index }), inputProps)

  return <ark.input {...mergedProps} ref={ref} />
})

PinInputInput.displayName = 'PinInputInput'
