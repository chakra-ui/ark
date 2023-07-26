import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useCarouselContext } from './carousel-context'

export type CarouselIndicatorGroupProps = HTMLArkProps<'div'>

export const CarouselIndicatorGroup = forwardRef<'div'>((props, ref) => {
  const { indicatorGroupProps } = useCarouselContext()
  const mergedProps = mergeProps(indicatorGroupProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
