import type { IndicatorProps } from '@zag-js/carousel'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselIndicatorProps extends Assign<HTMLArkProps<'button'>, IndicatorProps> {}

export const CarouselIndicator = forwardRef<HTMLButtonElement, CarouselIndicatorProps>(
  (props, ref) => {
    const [indicatorProps, buttonProps] = createSplitProps<IndicatorProps>()(props, [
      'readOnly',
      'index',
    ])

    const context = useCarouselContext()
    const mergedProps = mergeProps(context.getIndicatorProps(indicatorProps), buttonProps)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

CarouselIndicator.displayName = 'CarouselIndicator'
