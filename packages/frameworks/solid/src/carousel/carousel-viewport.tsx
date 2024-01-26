import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselViewportProps extends HTMLArkProps<'span'> {}

export const CarouselViewport: ArkComponent<'span'> = (props: CarouselViewportProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().viewportProps, props)

  return <ark.div {...mergedProps} />
}
