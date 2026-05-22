'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerSwipeAreaBaseProps extends PolymorphicProps {}
export interface DrawerSwipeAreaProps extends HTMLProps<'div'>, DrawerSwipeAreaBaseProps {}

export const DrawerSwipeArea = ({ ref, ...props }: DrawerSwipeAreaProps) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(drawer.getSwipeAreaProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

DrawerSwipeArea.displayName = 'DrawerSwipeArea'
