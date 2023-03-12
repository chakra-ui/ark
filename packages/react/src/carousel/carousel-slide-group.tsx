import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselSlideGroupProps = HTMLArkProps<'div'>

export const CarouselSlideGroup = forwardRef<'div', CarouselSlideGroupProps>((props, ref) => {
  const { slideGroupProps } = useCarouselContext()
  const mergedProps = mergeProps(slideGroupProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
