import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselViewportProps = HtmlArkProps<'div'>

export const CarouselViewport = forwardRef<HTMLDivElement, CarouselViewportProps>((props, ref) => {
  const { viewportProps } = useCarouselContext()
  const mergedProps = mergeProps(viewportProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

CarouselViewport.displayName = 'CarouselViewport'
