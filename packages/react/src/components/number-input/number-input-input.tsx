import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export type NumberInputInputBaseProps = {}
export interface NumberInputInputProps extends HTMLArkProps<'input'>, NumberInputInputBaseProps {}

export const NumberInputInput = forwardRef<HTMLInputElement, NumberInputInputProps>(
  (props, ref) => {
    const numberInput = useNumberInputContext()
    const mergedProps = mergeProps(numberInput.getInputProps(), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

NumberInputInput.displayName = 'NumberInputInput'
