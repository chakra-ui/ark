import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { carouselAnatomy } from './carousel.anatomy'
import { useCarouselContext } from './use-carousel-context'

const parts = carouselAnatomy.build()

export interface CarouselAutoplayIndicatorBaseProps extends PolymorphicProps {
  /**
   * The fallback content to render when autoplay is paused.
   */
  fallback?: React.ReactNode
}
export interface CarouselAutoplayIndicatorProps extends HTMLProps<'span'>, CarouselAutoplayIndicatorBaseProps {}

export const CarouselAutoplayIndicator = forwardRef<HTMLSpanElement, CarouselAutoplayIndicatorProps>((props, ref) => {
  const { children, fallback, ...restProps } = props
  const carousel = useCarouselContext()
  return (
    <ark.span ref={ref} {...parts.autoplayIndicator.attrs} {...restProps}>
      {carousel.isPlaying ? children : fallback}
    </ark.span>
  )
})

CarouselAutoplayIndicator.displayName = 'CarouselAutoplayIndicator'
