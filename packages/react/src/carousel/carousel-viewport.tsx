import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useCarouselContext } from './carousel-context'

export type CarouselViewportProps = HTMLArkProps<'div'>

export const CarouselViewport = forwardRef<'div'>((props, ref) => {
  const { viewportProps } = useCarouselContext()
  const mergedProps = mergeProps(viewportProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
