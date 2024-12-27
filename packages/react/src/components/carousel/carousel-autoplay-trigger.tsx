import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselAutoplayTriggerBaseProps extends PolymorphicProps {}
export interface CarouselAutoplayTriggerProps
  extends HTMLProps<'button'>,
    CarouselAutoplayTriggerBaseProps {}

export const CarouselAutoplayTrigger = forwardRef<HTMLButtonElement, CarouselAutoplayTriggerProps>(
  (props, ref) => {
    const carousel = useCarouselContext()
    const mergedProps = mergeProps(carousel.getAutoplayTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

CarouselAutoplayTrigger.displayName = 'CarouselAutoplayTrigger'
