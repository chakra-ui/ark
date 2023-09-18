import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselViewportProps = HTMLArkProps<'span'>

export const CarouselViewport = (props: CarouselViewportProps) => {
  const carousel = useCarouselContext()
  const viewportProps = mergeProps(() => carousel().viewportProps, props)
  return <ark.div {...viewportProps} />
}
