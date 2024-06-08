import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselNextTriggerProps extends HTMLArkProps<'button'> {}

export const CarouselNextTrigger = forwardRef<HTMLButtonElement, CarouselNextTriggerProps>(
  (props, ref) => {
    const carousel = useCarouselContext()
    const mergedProps = mergeProps(carousel.getNextTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

CarouselNextTrigger.displayName = 'CarouselNextTrigger'
