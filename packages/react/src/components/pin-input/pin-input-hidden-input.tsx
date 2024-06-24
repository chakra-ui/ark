import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from '../field'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputHiddenInputBaseProps extends PolymorphicProps {}
export interface PinInputHiddenInputProps
  extends HTMLProps<'input'>,
    PinInputHiddenInputBaseProps {}

export const PinInputHiddenInput = forwardRef<HTMLInputElement, PinInputHiddenInputProps>(
  (props, ref) => {
    const pinInput = usePinInputContext()
    const mergedProps = mergeProps(pinInput.getHiddenInputProps(), props)
    const field = useFieldContext()

    return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
  },
)

PinInputHiddenInput.displayName = 'PinInputHiddenInput'
