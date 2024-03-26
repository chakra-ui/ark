import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputInputProps extends HTMLArkProps<'input'> {}

export const NumberInputInput = forwardRef<HTMLInputElement, NumberInputInputProps>(
  (props, ref) => {
    const context = useNumberInputContext()
    const mergedProps = mergeProps(context.inputProps, props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

NumberInputInput.displayName = 'NumberInputInput'
