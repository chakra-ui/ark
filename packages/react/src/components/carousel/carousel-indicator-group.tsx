import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export type CarouselIndicatorGroupBaseProps = {}
export interface CarouselIndicatorGroupProps
  extends HTMLArkProps<'div'>,
    CarouselIndicatorGroupBaseProps {}

export const CarouselIndicatorGroup = forwardRef<HTMLDivElement, CarouselIndicatorGroupProps>(
  (props, ref) => {
    const carousel = useCarouselContext()
    const mergedProps = mergeProps(carousel.getIndicatorGroupProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

CarouselIndicatorGroup.displayName = 'CarouselIndicatorGroup'
