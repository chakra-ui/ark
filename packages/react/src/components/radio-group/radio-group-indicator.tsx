import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupIndicatorBaseProps extends PolymorphicProps {}
export interface RadioGroupIndicatorProps extends HTMLProps<'div'>, RadioGroupIndicatorBaseProps {}

export const RadioGroupIndicator = forwardRef<HTMLDivElement, RadioGroupIndicatorProps>(
  (props, ref) => {
    const radioGroup = useRadioGroupContext()
    const mergedProps = mergeProps(radioGroup.getIndicatorProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

RadioGroupIndicator.displayName = 'RadioGroupIndicator'
