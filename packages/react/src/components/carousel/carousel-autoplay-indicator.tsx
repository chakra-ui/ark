'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { carouselAnatomy } from './carousel.anatomy.ts'
import { useCarouselContext } from './use-carousel-context.ts'

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
