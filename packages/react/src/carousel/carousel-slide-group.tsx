import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselSlideGroupProps = HtmlArkProps<'div'>

export const CarouselSlideGroup = forwardRef<HTMLDivElement, CarouselSlideGroupProps>(
  (props, ref) => {
    const { slideGroupProps } = useCarouselContext()
    const mergedProps = mergeProps(slideGroupProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

CarouselSlideGroup.displayName = 'CarouselSlideGroup'
