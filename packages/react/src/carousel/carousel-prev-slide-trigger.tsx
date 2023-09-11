import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselPrevSlideTriggerProps = HtmlArkProps<'button'>

export const CarouselPrevSlideTrigger = forwardRef<
  HTMLButtonElement,
  CarouselPrevSlideTriggerProps
>((props, ref) => {
  const { prevSlideTriggerProps } = useCarouselContext()
  const mergedProps = mergeProps(prevSlideTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

CarouselPrevSlideTrigger.displayName = 'CarouselPrevSlideTrigger'
