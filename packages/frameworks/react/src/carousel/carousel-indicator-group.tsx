import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselIndicatorGroupProps extends HTMLArkProps<'div'> {}

export const CarouselIndicatorGroup = forwardRef<HTMLDivElement, CarouselIndicatorGroupProps>(
  (props, ref) => {
    const api = useCarouselContext()
    const mergedProps = mergeProps(api.indicatorGroupProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

CarouselIndicatorGroup.displayName = 'CarouselIndicatorGroup'
