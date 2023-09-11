import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselNextSlideTriggerProps = HtmlArkProps<'button'>

export const CarouselNextSlideTrigger = forwardRef<
  HTMLButtonElement,
  CarouselNextSlideTriggerProps
>((props, ref) => {
  const { nextSlideTriggerProps } = useCarouselContext()
  const mergedProps = mergeProps(nextSlideTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

CarouselNextSlideTrigger.displayName = 'CarouselNextSlideTrigger'
