import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'

export interface DrawerSwipeAreaBaseProps extends PolymorphicProps {}
export interface DrawerSwipeAreaProps extends HTMLProps<'div'>, DrawerSwipeAreaBaseProps {}

export const DrawerSwipeArea = forwardRef<HTMLDivElement, DrawerSwipeAreaProps>((props, ref) => {
  return <ark.div {...props} ref={ref} />
})

DrawerSwipeArea.displayName = 'DrawerSwipeArea'
