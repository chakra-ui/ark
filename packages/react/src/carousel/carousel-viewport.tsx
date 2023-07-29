import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselViewportProps = ComponentPropsWithoutRef<typeof ark.div>

export const CarouselViewport = forwardRef<HTMLDivElement, CarouselViewportProps>((props, ref) => {
  const { viewportProps } = useCarouselContext()
  const mergedProps = mergeProps(viewportProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

CarouselViewport.displayName = 'CarouselViewport'
