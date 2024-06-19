import { carouselAnatomy } from '@ark-ui/anatomy'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'

export interface CarouselControlBaseProps extends PolymorphicProps {}
export interface CarouselControlProps extends HTMLProps<'div'>, CarouselControlBaseProps {}

export const CarouselControl = forwardRef<HTMLDivElement, CarouselControlProps>((props, ref) => (
  <ark.div {...carouselAnatomy.build().control.attrs} {...props} ref={ref} />
))

CarouselControl.displayName = 'CarouselControl'
