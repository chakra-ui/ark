import { Children, cloneElement, ReactElement } from 'react'
import { useCarouselContext } from './carousel-context'

export type CarouselNextSlideTriggerProps = { children: ReactElement }

export const CarouselNextSlideTrigger = (props: CarouselNextSlideTriggerProps) => {
  const { nextTriggerProps } = useCarouselContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, nextTriggerProps)
}
