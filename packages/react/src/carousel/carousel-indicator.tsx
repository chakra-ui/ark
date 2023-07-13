import type { SlideIndicatorProps } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useCarouselContext } from './carousel-context'

export type CarouselIndicatorProps = Assign<HTMLArkProps<'button'>, SlideIndicatorProps>

export const CarouselIndicator = forwardRef<'button', CarouselIndicatorProps>((props, ref) => {
  const [indicatorProps, buttonProps] = createSplitProps<SlideIndicatorProps>()(props, [
    'readOnly',
    'index',
  ])

  const { getIndicatorProps } = useCarouselContext()
  const mergedProps = mergeProps(getIndicatorProps(indicatorProps), buttonProps)

  return <ark.button {...mergedProps} ref={ref} />
})
