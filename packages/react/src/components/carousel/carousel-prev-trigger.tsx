import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselPrevTriggerBaseProps extends PolymorphicProps {}
export interface CarouselPrevTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    CarouselPrevTriggerBaseProps {}

export const CarouselPrevTrigger = forwardRef<HTMLButtonElement, CarouselPrevTriggerProps>(
  (props, ref) => {
    const carousel = useCarouselContext()
    const mergedProps = mergeProps(carousel.getPrevTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

CarouselPrevTrigger.displayName = 'CarouselPrevTrigger'
