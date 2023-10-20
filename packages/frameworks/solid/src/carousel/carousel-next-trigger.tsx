import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselNextTriggerProps = HTMLArkProps<'button'>

export const CarouselNextTrigger = (props: CarouselNextTriggerProps) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(() => api().nextTriggerProps, props)

  return <ark.button {...mergedProps} />
}
