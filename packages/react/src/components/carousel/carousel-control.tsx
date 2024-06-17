import { carouselAnatomy } from '@ark-ui/anatomy'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'

export interface CarouselControlBaseProps extends PolymorphicProps {}
export interface CarouselControlProps
  extends HTMLAttributes<HTMLDivElement>,
    CarouselControlBaseProps {}

export const CarouselControl = forwardRef<HTMLDivElement, CarouselControlProps>((props, ref) => (
  <ark.div {...carouselAnatomy.build().control.attrs} {...props} ref={ref} />
))

CarouselControl.displayName = 'CarouselControl'
