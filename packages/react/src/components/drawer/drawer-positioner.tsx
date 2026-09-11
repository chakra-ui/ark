'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import type { PositionerState } from '@zag-js/drawer'

export interface DrawerPositionerState extends PositionerState {}

export interface DrawerPositionerBaseProps extends PolymorphicProps<DrawerPositionerState> {}
export interface DrawerPositionerProps extends HTMLProps<'div'>, DrawerPositionerBaseProps {}

export const DrawerPositioner = forwardRef<HTMLDivElement, DrawerPositionerProps>((props, ref) => {
  const drawer = useDrawerContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(drawer.getPositionerProps(), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} state={drawer.getPositionerState()} />
})

DrawerPositioner.displayName = 'DrawerPositioner'
