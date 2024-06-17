import { mergeProps } from '@zag-js/react'
import { type LabelHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputLabelBaseProps extends PolymorphicProps {}
export interface NumberInputLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    NumberInputLabelBaseProps {}

export const NumberInputLabel = forwardRef<HTMLLabelElement, NumberInputLabelProps>(
  (props, ref) => {
    const numberInput = useNumberInputContext()
    const mergedProps = mergeProps(numberInput.getLabelProps(), props)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

NumberInputLabel.displayName = 'NumberInputLabel'
