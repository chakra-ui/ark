import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselViewportBaseProps extends PolymorphicProps<'div'> {}
export interface CarouselViewportProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    CarouselViewportBaseProps {}

export const CarouselViewport = (props: CarouselViewportProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getViewportProps(), props)

  return <ark.div {...mergedProps} />
}
