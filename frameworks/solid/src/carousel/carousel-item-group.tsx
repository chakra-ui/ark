import { ark, type HTMLArkProps } from '../factory'
import { mergeProps } from '../merge-props'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselItemGroupProps extends HTMLArkProps<'div'> {}

export const CarouselItemGroup = (props: CarouselItemGroupProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().itemGroupProps, props)
  return <ark.div {...mergedProps} />
}
