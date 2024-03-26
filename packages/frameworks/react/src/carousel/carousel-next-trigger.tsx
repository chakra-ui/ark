import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselNextTriggerProps extends HTMLArkProps<'button'> {}

export const CarouselNextTrigger = forwardRef<HTMLButtonElement, CarouselNextTriggerProps>(
  (props, ref) => {
    const context = useCarouselContext()
    const mergedProps = mergeProps(context.nextTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

CarouselNextTrigger.displayName = 'CarouselNextTrigger'
