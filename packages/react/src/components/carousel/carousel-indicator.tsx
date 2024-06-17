import type { IndicatorProps } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselIndicatorBaseProps extends IndicatorProps, PolymorphicProps {}
export interface CarouselIndicatorProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    CarouselIndicatorBaseProps {}

export const CarouselIndicator = forwardRef<HTMLButtonElement, CarouselIndicatorProps>(
  (props, ref) => {
    const [indicatorProps, localProps] = createSplitProps<IndicatorProps>()(props, [
      'readOnly',
      'index',
    ])

    const carousel = useCarouselContext()
    const mergedProps = mergeProps(carousel.getIndicatorProps(indicatorProps), localProps)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

CarouselIndicator.displayName = 'CarouselIndicator'
