import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderControlProps = HtmlArkProps<'div'>

export const RangeSliderControl = forwardRef<HTMLDivElement, RangeSliderControlProps>(
  (props, ref) => {
    const { controlProps } = useRangeSliderContext()
    const mergedProps = mergeProps(controlProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

RangeSliderControl.displayName = 'RangeSliderControl'
