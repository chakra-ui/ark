import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderLabelProps = HtmlArkProps<'label'>

export const RangeSliderLabel = forwardRef<HTMLLabelElement, RangeSliderLabelProps>(
  (props, ref) => {
    const { labelProps } = useRangeSliderContext()
    const mergedProps = mergeProps(labelProps, props)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

RangeSliderLabel.displayName = 'RangeSliderLabel'
