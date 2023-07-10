import type { SlideProps } from '@zag-js/carousel/dist/carousel.types'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useCarouselContext } from './carousel-context'

export type CarouselIndicatorProps = Assign<HTMLArkProps<'button'>, SlideProps>

export const CarouselIndicator = forwardRef<'button', CarouselIndicatorProps>((props, ref) => {
  const { index, ...buttonProps } = props
  const { scrollTo, getIndicatorProps } = useCarouselContext()
  const mergedProps = mergeProps(getIndicatorProps({ index }), buttonProps)

  return <ark.button {...mergedProps} ref={ref} onClick={() => scrollTo(index)} />
})
