import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselViewportProps = HTMLArkProps<'div'>

export const CarouselViewport = forwardRef<'div', CarouselViewportProps>((props, ref) => {
  const { viewportProps } = useCarouselContext()
  const mergedProps = mergeProps(viewportProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
