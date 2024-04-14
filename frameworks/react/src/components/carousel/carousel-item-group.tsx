import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselItemGroupProps extends HTMLArkProps<'div'> {}

export const CarouselItemGroup = forwardRef<HTMLDivElement, CarouselItemGroupProps>(
  (props, ref) => {
    const carousel = useCarouselContext()
    const mergedProps = mergeProps(carousel.itemGroupProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

CarouselItemGroup.displayName = 'CarouselItemGroup'
