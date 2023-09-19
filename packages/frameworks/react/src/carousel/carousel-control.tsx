import { carouselAnatomy } from '@ark-ui/anatomy'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'

export type CarouselControlProps = HTMLArkProps<'div'>

export const CarouselControl = forwardRef<HTMLDivElement, CarouselControlProps>((props, ref) => (
  <ark.div {...carouselAnatomy.build().control.attrs} {...props} ref={ref} />
))

CarouselControl.displayName = 'CarouselControl'
