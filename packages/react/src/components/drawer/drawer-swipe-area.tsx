'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import type { SwipeAreaState } from '@zag-js/drawer'

export interface DrawerSwipeAreaState extends SwipeAreaState {}

export interface DrawerSwipeAreaBaseProps extends PolymorphicProps<DrawerSwipeAreaState> {}
export interface DrawerSwipeAreaProps extends HTMLProps<'div'>, DrawerSwipeAreaBaseProps {}

export const DrawerSwipeArea = forwardRef<HTMLDivElement, DrawerSwipeAreaProps>((props, ref) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(drawer.getSwipeAreaProps(), props)

  return <ark.div {...mergedProps} ref={ref} state={drawer.getSwipeAreaState()} />
})

DrawerSwipeArea.displayName = 'DrawerSwipeArea'
