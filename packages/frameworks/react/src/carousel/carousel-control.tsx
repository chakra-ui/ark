import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { parts } from './carousel.anatomy'

export type CarouselControlProps = HTMLArkProps<'div'>

export const CarouselControl = forwardRef<HTMLDivElement, CarouselControlProps>((props, ref) => (
  <ark.div {...parts.control.attrs} {...props} ref={ref} />
))

CarouselControl.displayName = 'CarouselControl'
