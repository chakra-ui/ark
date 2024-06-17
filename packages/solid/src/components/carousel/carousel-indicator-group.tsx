import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselIndicatorGroupBaseProps extends PolymorphicProps<'div'> {}
export interface CarouselIndicatorGroupProps
  extends HTMLProps<'div'>,
    CarouselIndicatorGroupBaseProps {}

export const CarouselIndicatorGroup = (props: CarouselIndicatorGroupProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getIndicatorGroupProps(), props)

  return <ark.div {...mergedProps} />
}
