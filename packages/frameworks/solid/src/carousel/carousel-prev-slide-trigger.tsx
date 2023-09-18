import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselPrevSlideTriggerProps = HTMLArkProps<'button'>

export const CarouselPrevSlideTrigger = (props: CarouselPrevSlideTriggerProps) => {
  const carousel = useCarouselContext()
  const mergedProps = mergeProps(() => carousel().prevSlideTriggerProps, props)

  return <ark.button {...mergedProps} />
}
