import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselIndicatorGroupProps = HTMLArkProps<'div'>

export const CarouselIndicatorGroup = (props: CarouselIndicatorGroupProps) => {
  const carousel = useCarouselContext()
  const indicatorGroupProps = mergeProps(() => carousel().indicatorGroupProps, props)
  return <ark.div {...indicatorGroupProps} />
}
