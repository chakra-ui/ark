import type { IndicatorProps, IndicatorState } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useCarouselContext } from './use-carousel-context.ts'

export interface CarouselIndicatorState extends IndicatorState {}

export interface CarouselIndicatorBaseProps
  extends IndicatorProps, PolymorphicProps<'button', CarouselIndicatorState> {}
export interface CarouselIndicatorProps extends HTMLProps<'button'>, CarouselIndicatorBaseProps {}

export const CarouselIndicator = (props: CarouselIndicatorProps) => {
  const [indicatorProps, localProps] = createSplitProps<IndicatorProps>()(props, ['index', 'readOnly'])
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().getIndicatorProps(indicatorProps), localProps)

  return <ark.button {...mergedProps} state={api().getIndicatorState(indicatorProps)} />
}
