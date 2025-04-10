import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { tourAnatomy } from './tour.anatomy'

export interface TourControlBaseProps extends PolymorphicProps {}
export interface TourControlProps extends HTMLProps<'div'>, TourControlBaseProps {}

export const TourControl = forwardRef<HTMLDivElement, TourControlProps>((props, ref) => (
  <ark.div {...tourAnatomy.build().control.attrs} {...props} ref={ref} />
))

TourControl.displayName = 'TourControl'
