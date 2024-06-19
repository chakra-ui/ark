import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputHiddenInputBaseProps extends PolymorphicProps {}
export interface PinInputHiddenInputProps
  extends HTMLProps<'input'>,
    PinInputHiddenInputBaseProps {}

export const PinInputHiddenInput = forwardRef<HTMLInputElement, PinInputHiddenInputProps>(
  (props, ref) => {
    const pinInput = usePinInputContext()
    const mergedProps = mergeProps(pinInput.getHiddenInputProps(), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

PinInputHiddenInput.displayName = 'PinInputHiddenInput'
