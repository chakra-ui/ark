import { Children, cloneElement, ReactElement } from 'react'
import { useCarouselContext } from './carousel-context'

export type CarouselPrevSlideTriggerProps = { children: ReactElement }

export const CarouselPrevSlideTrigger = (props: CarouselPrevSlideTriggerProps) => {
  const { previousTriggerProps } = useCarouselContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, previousTriggerProps)
}
