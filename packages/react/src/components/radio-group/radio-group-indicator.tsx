import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupIndicatorProps extends HTMLArkProps<'div'> {}

export const RadioGroupIndicator = forwardRef<HTMLDivElement, RadioGroupIndicatorProps>(
  (props, ref) => {
    const radioGroup = useRadioGroupContext()
    const mergedProps = mergeProps(radioGroup.getIndicatorProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

RadioGroupIndicator.displayName = 'RadioGroupIndicator'
