import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerGrabberIndicatorBaseProps extends PolymorphicProps {}
export interface DrawerGrabberIndicatorProps extends HTMLProps<'div'>, DrawerGrabberIndicatorBaseProps {}

export const DrawerGrabberIndicator = forwardRef<HTMLDivElement, DrawerGrabberIndicatorProps>((props, ref) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(drawer.getGrabberIndicatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

DrawerGrabberIndicator.displayName = 'DrawerGrabberIndicator'
