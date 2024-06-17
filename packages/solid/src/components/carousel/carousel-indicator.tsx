import type { IndicatorProps } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselIndicatorBaseProps extends IndicatorProps, PolymorphicProps<'button'> {}
export interface CarouselIndicatorProps extends HTMLProps<'button'>, CarouselIndicatorBaseProps {}

export const CarouselIndicator = (props: CarouselIndicatorProps) => {
  const [indicatorProps, localProps] = createSplitProps<IndicatorProps>()(props, [
    'index',
    'readOnly',
  ])
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getIndicatorProps(indicatorProps), localProps)

  return <ark.button {...mergedProps} />
}
