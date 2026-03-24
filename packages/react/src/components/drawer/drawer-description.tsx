import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerDescriptionBaseProps extends PolymorphicProps {}
export interface DrawerDescriptionProps extends HTMLProps<'div'>, DrawerDescriptionBaseProps {}

export const DrawerDescription = forwardRef<HTMLDivElement, DrawerDescriptionProps>((props, ref) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(drawer.getDescriptionProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

DrawerDescription.displayName = 'DrawerDescription'
