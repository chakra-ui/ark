import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselViewportBaseProps extends PolymorphicProps {}
export interface CarouselViewportProps
  extends HTMLAttributes<HTMLDivElement>,
    CarouselViewportBaseProps {}

export const CarouselViewport = forwardRef<HTMLDivElement, CarouselViewportProps>((props, ref) => {
  const carousel = useCarouselContext()
  const mergedProps = mergeProps(carousel.getViewportProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

CarouselViewport.displayName = 'CarouselViewport'
