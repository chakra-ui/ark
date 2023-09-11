import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselIndicatorGroupProps = HtmlArkProps<'div'>

export const CarouselIndicatorGroup = forwardRef<HTMLDivElement, CarouselIndicatorGroupProps>(
  (props, ref) => {
    const { indicatorGroupProps } = useCarouselContext()
    const mergedProps = mergeProps(indicatorGroupProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

CarouselIndicatorGroup.displayName = 'CarouselIndicatorGroup'
