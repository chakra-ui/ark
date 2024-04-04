import { ark, type HTMLArkProps } from '../factory'
import { mergeProps } from '../merge-props'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselPrevTriggerProps extends HTMLArkProps<'button'> {}

export const CarouselPrevTrigger = (props: CarouselPrevTriggerProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().prevTriggerProps, props)

  return <ark.button {...mergedProps} />
}
