import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useCarouselContext } from './carousel-context'

export type CarouselPrevSlideTriggerProps = HTMLArkProps<'button'>

export const CarouselPrevSlideTrigger = forwardRef<'button'>((props, ref) => {
  const { prevTriggerProps } = useCarouselContext()
  const mergedProps = mergeProps(prevTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
