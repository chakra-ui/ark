'use client'

import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { tourAnatomy } from './tour.anatomy'

export interface TourControlBaseProps extends PolymorphicProps {}
export interface TourControlProps extends HTMLProps<'div'>, TourControlBaseProps {}

export const TourControl = ({
  ref,
  ...props
}: TourControlProps & {
  ref: React.RefObject<HTMLDivElement>
}) => <ark.div {...tourAnatomy.build().control.attrs} {...props} ref={ref} />

TourControl.displayName = 'TourControl'
