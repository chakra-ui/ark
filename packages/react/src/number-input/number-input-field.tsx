import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputInputProps = HTMLArkProps<'input'>

export const NumberInputInput = forwardRef<HTMLInputElement, NumberInputInputProps>(
  (props, ref) => {
    const { inputProps } = useNumberInputContext()
    const mergedProps = mergeProps(inputProps, props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

NumberInputInput.displayName = 'NumberInputInput'
