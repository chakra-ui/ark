import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselNextSlideTriggerProps = HTMLArkProps<'button'>

export const CarouselNextSlideTrigger = forwardRef<
  HTMLButtonElement,
  CarouselNextSlideTriggerProps
>((props, ref) => {
  const { nextSlideTriggerProps } = useCarouselContext()
  const mergedProps = mergeProps(nextSlideTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

CarouselNextSlideTrigger.displayName = 'CarouselNextSlideTrigger'
