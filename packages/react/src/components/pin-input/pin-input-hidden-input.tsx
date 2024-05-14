import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputHiddenInputProps extends HTMLArkProps<'input'> {}

export const PinInputHiddenInput = forwardRef<HTMLInputElement, PinInputHiddenInputProps>(
  (props, ref) => {
    const pinInput = usePinInputContext()
    const mergedProps = mergeProps(pinInput.hiddenInputProps, props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

PinInputHiddenInput.displayName = 'PinInputHiddenInput'
