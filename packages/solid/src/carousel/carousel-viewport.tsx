import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselViewportProps = HTMLArkProps<'span'>

export const CarouselViewport = (props: CarouselViewportProps) => {
  const carousel = useCarouselContext()

  return <ark.div {...carousel().viewportProps} {...props} />
}
