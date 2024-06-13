import { carouselAnatomy } from '@ark-ui/anatomy'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'

export type CarouselControlBaseProps = {}
export interface CarouselControlProps extends HTMLArkProps<'div'>, CarouselControlBaseProps {}

export const CarouselControl = forwardRef<HTMLDivElement, CarouselControlProps>((props, ref) => (
  <ark.div {...carouselAnatomy.build().control.attrs} {...props} ref={ref} />
))

CarouselControl.displayName = 'CarouselControl'
