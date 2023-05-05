import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useCarouselContext } from './carousel-context'

export type CarouselSlideGroupProps = HTMLArkProps<'div'>

export const CarouselSlideGroup = forwardRef<'div'>((props, ref) => {
  const { slideGroupProps } = useCarouselContext()
  const mergedProps = mergeProps(slideGroupProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
