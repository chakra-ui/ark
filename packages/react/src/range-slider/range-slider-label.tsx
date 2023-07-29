import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderLabelProps = ComponentPropsWithoutRef<typeof ark.label>

export const RangeSliderLabel = forwardRef<HTMLLabelElement, RangeSliderLabelProps>(
  (props, ref) => {
    const { labelProps } = useRangeSliderContext()
    const mergedProps = mergeProps(labelProps, props)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

RangeSliderLabel.displayName = 'RangeSliderLabel'
