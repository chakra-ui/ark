import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselItemGroupBaseProps extends PolymorphicProps<'div'> {}
export interface CarouselItemGroupProps extends HTMLProps<'div'>, CarouselItemGroupBaseProps {}

export const CarouselItemGroup = (props: CarouselItemGroupProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getItemGroupProps(), props)
  return <ark.div {...mergedProps} />
}
