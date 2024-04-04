import { ark, type HTMLArkProps } from '../factory'
import { mergeProps } from '../merge-props'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselViewportProps extends HTMLArkProps<'div'> {}

export const CarouselViewport = (props: CarouselViewportProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().viewportProps, props)

  return <ark.div {...mergedProps} />
}
