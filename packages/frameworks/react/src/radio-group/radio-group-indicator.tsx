import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'

export interface RadioGroupIndicatorProps extends HTMLArkProps<'div'> {}

export const RadioGroupIndicator = forwardRef<HTMLDivElement, RadioGroupIndicatorProps>(
  (props, ref) => {
    const api = useRadioGroupContext()
    const mergedProps = mergeProps(api.indicatorProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

RadioGroupIndicator.displayName = 'RadioGroupIndicator'
