import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselIndicatorGroupProps extends HTMLArkProps<'div'> {}

export const CarouselIndicatorGroup = (props: CarouselIndicatorGroupProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().indicatorGroupProps, props)

  return <ark.div {...mergedProps} />
}
