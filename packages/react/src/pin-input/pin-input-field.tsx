import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import type { Assign } from '../types'
import { usePinInputContext } from './pin-input-context'

export type PinInputInputProps = Assign<HtmlArkProps<'input'>, { index: number }>

export const PinInputInput = forwardRef<HTMLInputElement, PinInputInputProps>((props, ref) => {
  const { index, ...inputProps } = props
  const { getInputProps } = usePinInputContext()
  const mergedProps = mergeProps(getInputProps({ index }), inputProps)

  return <ark.input {...mergedProps} ref={ref} />
})

PinInputInput.displayName = 'PinInputInput'
