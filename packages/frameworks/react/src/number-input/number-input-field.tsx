import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export interface NumberInputInputProps extends HTMLArkProps<'input'> {}

export const NumberInputInput = forwardRef<HTMLInputElement, NumberInputInputProps>(
  (props, ref) => {
    const api = useNumberInputContext()
    const mergedProps = mergeProps(api.inputProps, props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

NumberInputInput.displayName = 'NumberInputInput'
