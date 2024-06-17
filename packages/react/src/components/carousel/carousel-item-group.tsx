import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselItemGroupBaseProps extends PolymorphicProps {}
export interface CarouselItemGroupProps
  extends HTMLAttributes<HTMLDivElement>,
    CarouselItemGroupBaseProps {}

export const CarouselItemGroup = forwardRef<HTMLDivElement, CarouselItemGroupProps>(
  (props, ref) => {
    const carousel = useCarouselContext()
    const mergedProps = mergeProps(carousel.getItemGroupProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

CarouselItemGroup.displayName = 'CarouselItemGroup'
