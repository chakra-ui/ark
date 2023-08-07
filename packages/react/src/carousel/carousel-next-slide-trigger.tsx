import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselNextSlideTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const CarouselNextSlideTrigger = forwardRef<
  HTMLButtonElement,
  CarouselNextSlideTriggerProps
>((props, ref) => {
  const { nextSlideTriggerProps } = useCarouselContext()
  const mergedProps = mergeProps(nextSlideTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

CarouselNextSlideTrigger.displayName = 'CarouselNextSlideTrigger'
