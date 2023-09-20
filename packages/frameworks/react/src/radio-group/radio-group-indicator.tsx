import { radioGroupAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'

export type RadioGroupIndicatorProps = HTMLArkProps<'div'>

export const RadioGroupIndicator = forwardRef<HTMLDivElement, RadioGroupIndicatorProps>(
  (props, ref) => {
    const { indicatorProps } = useRadioGroupContext()
    const mergedProps = mergeProps(indicatorProps, props)

    return <ark.div {...mergedProps} {...radioGroupAnatomy.build().indicator.attrs} ref={ref} />
  },
)

RadioGroupIndicator.displayName = 'RadioGroupIndicator'
