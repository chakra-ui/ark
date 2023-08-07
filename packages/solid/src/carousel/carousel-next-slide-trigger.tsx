import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselNextSlideTriggerProps = HTMLArkProps<'button'>

export const CarouselNextSlideTrigger = (props: CarouselNextSlideTriggerProps) => {
  const carousel = useCarouselContext()
  const mergedProps = mergeProps(() => carousel().nextSlideTriggerProps, props)

  return <ark.button {...mergedProps} />
}
