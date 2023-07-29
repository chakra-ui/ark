import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export type RangeSliderControlProps = ComponentPropsWithoutRef<typeof ark.div>

export const RangeSliderControl = forwardRef<HTMLDivElement, RangeSliderControlProps>(
  (props, ref) => {
    const { controlProps } = useRangeSliderContext()
    const mergedProps = mergeProps(controlProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

RangeSliderControl.displayName = 'RangeSliderControl'
