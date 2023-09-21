import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export interface RangeSliderControlProps extends HTMLArkProps<'div'> {}

export const RangeSliderControl = forwardRef<HTMLDivElement, RangeSliderControlProps>(
  (props, ref) => {
    const api = useRangeSliderContext()
    const mergedProps = mergeProps(api.controlProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

RangeSliderControl.displayName = 'RangeSliderControl'
