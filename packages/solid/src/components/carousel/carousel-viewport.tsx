import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselViewportProps extends HTMLArkProps<'div'> {}

export const CarouselViewport = (props: CarouselViewportProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getViewportProps(), props)

  return <ark.div {...mergedProps} />
}
