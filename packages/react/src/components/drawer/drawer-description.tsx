import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'

export interface DrawerDescriptionBaseProps extends PolymorphicProps {}
export interface DrawerDescriptionProps extends HTMLProps<'div'>, DrawerDescriptionBaseProps {}

export const DrawerDescription = forwardRef<HTMLDivElement, DrawerDescriptionProps>((props, ref) => {
  return <ark.div {...props} ref={ref} />
})

DrawerDescription.displayName = 'DrawerDescription'
