import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselSlideGroupProps = ComponentPropsWithoutRef<typeof ark.div>

export const CarouselSlideGroup = forwardRef<HTMLDivElement, CarouselSlideGroupProps>(
  (props, ref) => {
    const { slideGroupProps } = useCarouselContext()
    const mergedProps = mergeProps(slideGroupProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

CarouselSlideGroup.displayName = 'CarouselSlideGroup'
