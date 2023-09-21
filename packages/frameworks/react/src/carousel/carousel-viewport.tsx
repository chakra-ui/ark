import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselViewportProps extends HTMLArkProps<'div'> {}

export const CarouselViewport = forwardRef<HTMLDivElement, CarouselViewportProps>((props, ref) => {
  const api = useCarouselContext()
  const mergedProps = mergeProps(api.viewportProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

CarouselViewport.displayName = 'CarouselViewport'
