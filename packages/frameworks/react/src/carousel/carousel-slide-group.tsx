import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselSlideGroupProps extends HTMLArkProps<'div'> {}

export const CarouselSlideGroup = forwardRef<HTMLDivElement, CarouselSlideGroupProps>(
  (props, ref) => {
    const api = useCarouselContext()
    const mergedProps = mergeProps(api.slideGroupProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

CarouselSlideGroup.displayName = 'CarouselSlideGroup'
