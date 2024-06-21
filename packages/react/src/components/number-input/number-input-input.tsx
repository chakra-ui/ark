import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from '../field'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputInputBaseProps extends PolymorphicProps {}
export interface NumberInputInputProps extends HTMLProps<'input'>, NumberInputInputBaseProps {}

export const NumberInputInput = forwardRef<HTMLInputElement, NumberInputInputProps>(
  (props, ref) => {
    const numberInput = useNumberInputContext()
    const mergedProps = mergeProps(numberInput.getInputProps(), props)
    const field = useFieldContext()

    return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
  },
)

NumberInputInput.displayName = 'NumberInputInput'
