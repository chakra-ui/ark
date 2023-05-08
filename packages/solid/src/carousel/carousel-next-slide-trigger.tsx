import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselNextSlideTriggerProps = HTMLArkProps<'button'>

export const CarouselNextSlideTrigger = (props: CarouselNextSlideTriggerProps) => {
  const carousel = useCarouselContext()

  return <ark.button {...carousel().nextTriggerProps} {...props} />
}
