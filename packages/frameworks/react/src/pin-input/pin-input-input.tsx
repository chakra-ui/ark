import type { InputProps } from '@zag-js/pin-input'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputInputProps extends Assign<HTMLArkProps<'input'>, InputProps> {}

export const PinInputInput = forwardRef<HTMLInputElement, PinInputInputProps>((props, ref) => {
  const { index, ...inputProps } = props
  const context = usePinInputContext()
  const mergedProps = mergeProps(context.getInputProps({ index }), inputProps)

  return <ark.input {...mergedProps} ref={ref} />
})

PinInputInput.displayName = 'PinInputInput'
