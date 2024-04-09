import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselPrevTriggerProps extends HTMLArkProps<'button'> {}

export const CarouselPrevTrigger = forwardRef<HTMLButtonElement, CarouselPrevTriggerProps>(
  (props, ref) => {
    const carousel = useCarouselContext()
    const mergedProps = mergeProps(carousel.prevTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

CarouselPrevTrigger.displayName = 'CarouselPrevTrigger'
