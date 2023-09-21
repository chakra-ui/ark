import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselNextSlideTriggerProps extends HTMLArkProps<'button'> {}

export const CarouselNextSlideTrigger = forwardRef<
  HTMLButtonElement,
  CarouselNextSlideTriggerProps
>((props, ref) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(api.nextSlideTriggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

CarouselNextSlideTrigger.displayName = 'CarouselNextSlideTrigger'
