import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselNextTriggerBaseProps extends PolymorphicProps {}
export interface CarouselNextTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    CarouselNextTriggerBaseProps {}

export const CarouselNextTrigger = forwardRef<HTMLButtonElement, CarouselNextTriggerProps>(
  (props, ref) => {
    const carousel = useCarouselContext()
    const mergedProps = mergeProps(carousel.getNextTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

CarouselNextTrigger.displayName = 'CarouselNextTrigger'
