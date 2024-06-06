import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputLabelProps extends HTMLArkProps<'label'> {}

export const NumberInputLabel = forwardRef<HTMLLabelElement, NumberInputLabelProps>(
  (props, ref) => {
    const numberInput = useNumberInputContext()
    const mergedProps = mergeProps(numberInput.getLabelProps(), props)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

NumberInputLabel.displayName = 'NumberInputLabel'
