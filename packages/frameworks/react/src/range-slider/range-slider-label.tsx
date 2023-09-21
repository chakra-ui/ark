import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRangeSliderContext } from './range-slider-context'

export interface RangeSliderLabelProps extends HTMLArkProps<'label'> {}

export const RangeSliderLabel = forwardRef<HTMLLabelElement, RangeSliderLabelProps>(
  (props, ref) => {
    const api = useRangeSliderContext()
    const mergedProps = mergeProps(api.labelProps, props)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

RangeSliderLabel.displayName = 'RangeSliderLabel'
