import type { ReactNode } from 'react'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselAutoplayIndicatorBaseProps {
  /**
   * The content to render when autoplay is paused.
   */
  paused: ReactNode
  /**
   * The content to render when autoplay is playing.
   */
  playing: ReactNode
}
export interface CarouselAutoplayIndicatorProps extends CarouselAutoplayIndicatorBaseProps {}

export const CarouselAutoplayIndicator = (props: CarouselAutoplayIndicatorProps) => {
  const carousel = useCarouselContext()
  return <>{carousel.isPlaying ? props.paused : props.playing}</>
}

CarouselAutoplayIndicator.displayName = 'CarouselAutoplayIndicator'
