import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputFieldProps = ComponentPropsWithoutRef<typeof ark.input>

export const NumberInputField = forwardRef<HTMLInputElement, NumberInputFieldProps>(
  (props, ref) => {
    const { inputProps } = useNumberInputContext()
    const mergedProps = mergeProps(inputProps, props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

NumberInputField.displayName = 'NumberInputField'
