import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useCarouselContext } from './carousel-context'

export type CarouselNextSlideTriggerProps = HTMLArkProps<'button'>

export const CarouselNextSlideTrigger = forwardRef<'button'>((props, ref) => {
  const { nextTriggerProps } = useCarouselContext()
  const mergedProps = mergeProps(nextTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
