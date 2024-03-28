import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselItemGroupProps extends HTMLArkProps<'div'> {}

export const CarouselItemGroup = forwardRef<HTMLDivElement, CarouselItemGroupProps>(
  (props, ref) => {
    const context = useCarouselContext()
    const mergedProps = mergeProps(context.itemGroupProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

CarouselItemGroup.displayName = 'CarouselItemGroup'
