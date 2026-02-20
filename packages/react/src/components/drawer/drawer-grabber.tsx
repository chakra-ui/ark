import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerGrabberBaseProps extends PolymorphicProps {}
export interface DrawerGrabberProps extends HTMLProps<'div'>, DrawerGrabberBaseProps {}

export const DrawerGrabber = forwardRef<HTMLDivElement, DrawerGrabberProps>((props, ref) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(drawer.getGrabberProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

DrawerGrabber.displayName = 'DrawerGrabber'
