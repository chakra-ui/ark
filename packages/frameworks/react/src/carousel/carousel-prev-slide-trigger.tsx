import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselPrevSlideTriggerProps extends HTMLArkProps<'button'> {}

export const CarouselPrevSlideTrigger = forwardRef<
  HTMLButtonElement,
  CarouselPrevSlideTriggerProps
>((props, ref) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(api.prevSlideTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

CarouselPrevSlideTrigger.displayName = 'CarouselPrevSlideTrigger'
