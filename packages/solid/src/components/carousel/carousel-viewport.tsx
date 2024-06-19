import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselViewportBaseProps extends PolymorphicProps<'div'> {}
export interface CarouselViewportProps extends HTMLProps<'div'>, CarouselViewportBaseProps {}

export const CarouselViewport = (props: CarouselViewportProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getViewportProps(), props)

  return <ark.div {...mergedProps} />
}
