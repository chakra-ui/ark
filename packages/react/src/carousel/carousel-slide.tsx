import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useCarouselContext } from './carousel-context'

export type CarouselSlideProps = Assign<HTMLArkProps<'div'>, { index: number }>

export const CarouselSlide = forwardRef<'div', CarouselSlideProps>((props, ref) => {
  const { index, ...divProps } = props
  const { getSlideProps } = useCarouselContext()
  const mergedProps = mergeProps(getSlideProps({ index }), divProps)

  return <ark.div {...mergedProps} ref={ref} />
})
