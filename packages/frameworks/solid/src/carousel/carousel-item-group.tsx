import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselItemGroupProps extends HTMLArkProps<'div'> {}

export const CarouselItemGroup = (props: CarouselItemGroupProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().itemGroupProps, props)

  return <ark.div {...mergedProps} />
}
