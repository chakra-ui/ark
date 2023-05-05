import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { usePinInputContext } from './pin-input-context'

export type PinInputFieldProps = Assign<HTMLArkProps<'input'>, { index: number }>

export const PinInputField = forwardRef<'input', { index: number }>((props, ref) => {
  const { index, ...inputProps } = props
  const { getInputProps } = usePinInputContext()
  const mergedProps = mergeProps(getInputProps({ index }), inputProps)

  return <ark.input {...mergedProps} ref={ref} />
})
