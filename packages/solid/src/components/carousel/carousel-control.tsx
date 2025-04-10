import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselControlBaseProps extends PolymorphicProps<'div'> {}
export interface CarouselControlProps extends HTMLProps<'div'>, CarouselControlBaseProps {}

export const CarouselControl = (props: CarouselControlProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
