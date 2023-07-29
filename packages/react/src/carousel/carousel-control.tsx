import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { parts } from './carousel.anatomy'

export type CarouselControlProps = ComponentPropsWithoutRef<typeof ark.div>

export const CarouselControl = forwardRef<HTMLDivElement, CarouselControlProps>((props, ref) => (
  <ark.div {...parts.control.attrs} {...props} ref={ref} />
))

CarouselControl.displayName = 'CarouselControl'
