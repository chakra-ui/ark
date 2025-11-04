import { Show, type JSX } from 'solid-js'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselAutoplayIndicatorBaseProps {
  /**
   * The content to render when autoplay is paused.
   */
  paused: JSX.Element
  /**
   * The content to render when autoplay is playing.
   */
  playing: JSX.Element
}
export interface CarouselAutoplayIndicatorProps extends CarouselAutoplayIndicatorBaseProps {}

export const CarouselAutoplayIndicator = (props: CarouselAutoplayIndicatorProps) => {
  const api = useCarouselContext()
  return (
    <Show when={api().isPlaying} fallback={props.playing}>
      {props.paused}
    </Show>
  )
}
