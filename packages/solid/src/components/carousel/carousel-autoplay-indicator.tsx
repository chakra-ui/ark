import { Show, type JSX } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { carouselAnatomy } from './carousel.anatomy'
import { useCarouselContext } from './use-carousel-context'

const parts = carouselAnatomy.build()

export interface CarouselAutoplayIndicatorBaseProps extends PolymorphicProps<'span'> {
  /**
   * The fallback content to render when autoplay is paused.
   */
  fallback?: JSX.Element
}
export interface CarouselAutoplayIndicatorProps extends HTMLProps<'span'>, CarouselAutoplayIndicatorBaseProps {}

export const CarouselAutoplayIndicator = (props: CarouselAutoplayIndicatorProps) => {
  const api = useCarouselContext()
  return (
    <ark.span {...parts.autoplayIndicator.attrs} {...props}>
      <Show when={api().isPlaying} fallback={props.fallback}>
        {props.children}
      </Show>
    </ark.span>
  )
}
