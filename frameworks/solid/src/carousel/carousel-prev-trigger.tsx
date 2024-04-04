import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselPrevTriggerProps extends HTMLArkProps<'button'> {}

export const CarouselPrevTrigger = (props: CarouselPrevTriggerProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().prevTriggerProps, props)

  return <ark.button {...mergedProps()} />
}
