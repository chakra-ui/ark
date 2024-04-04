import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselNextTriggerProps extends HTMLArkProps<'button'> {}

export const CarouselNextTrigger = (props: CarouselNextTriggerProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().nextTriggerProps, props)

  return <ark.button {...mergedProps()} />
}
