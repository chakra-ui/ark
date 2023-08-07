import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselPrevSlideTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const CarouselPrevSlideTrigger = forwardRef<
  HTMLButtonElement,
  CarouselPrevSlideTriggerProps
>((props, ref) => {
  const { prevSlideTriggerProps } = useCarouselContext()
  const mergedProps = mergeProps(prevSlideTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

CarouselPrevSlideTrigger.displayName = 'CarouselPrevSlideTrigger'
