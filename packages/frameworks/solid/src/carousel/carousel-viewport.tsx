import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselViewportProps extends HTMLArkProps<'div'> {}

export const CarouselViewport = (props: CarouselViewportProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().viewportProps, props)

  return <ark.div {...mergedProps} />
}
