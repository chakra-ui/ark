import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselPrevSlideTriggerProps = HTMLArkProps<'button'>

export const CarouselPrevSlideTrigger = (props: CarouselPrevSlideTriggerProps) => {
  const carousel = useCarouselContext()

  return <ark.button {...carousel().prevTriggerProps} {...props} />
}
