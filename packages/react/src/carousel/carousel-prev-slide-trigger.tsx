import { Children, cloneElement, type ReactElement } from 'react'
import { useCarouselContext } from './carousel-context'

export type CarouselPrevSlideTriggerProps = { children: ReactElement }

export const CarouselPrevSlideTrigger = (props: CarouselPrevSlideTriggerProps) => {
  const { prevTriggerProps } = useCarouselContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, prevTriggerProps)
}
