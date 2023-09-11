import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselSlideGroupProps = HTMLArkProps<'div'>

export const CarouselSlideGroup = forwardRef<HTMLDivElement, CarouselSlideGroupProps>(
  (props, ref) => {
    const { slideGroupProps } = useCarouselContext()
    const mergedProps = mergeProps(slideGroupProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

CarouselSlideGroup.displayName = 'CarouselSlideGroup'
