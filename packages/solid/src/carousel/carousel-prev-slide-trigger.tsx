import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselPrevSlideTriggerProps = HTMLArkProps<'button'>

export const CarouselPrevSlideTrigger = (props: CarouselPrevSlideTriggerProps) => {
  const carousel = useCarouselContext()
  const prevTriggerProps = mergeProps(() => carousel().prevTriggerProps, props)
  return <ark.button {...prevTriggerProps} />
}
