import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { usePinInputContext } from './pin-input-context'

export type PinInputHiddenInputProps = ComponentPropsWithoutRef<typeof ark.input>

export const PinInputHiddenInput = forwardRef<HTMLInputElement, PinInputHiddenInputProps>(
  (props, ref) => {
    const { hiddenInputProps } = usePinInputContext()
    const mergedProps = mergeProps(hiddenInputProps, props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

PinInputHiddenInput.displayName = 'PinInputHiddenInput'
