'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerCloseTriggerBaseProps extends PolymorphicProps {}
export interface DrawerCloseTriggerProps extends HTMLProps<'button'>, DrawerCloseTriggerBaseProps {}

export const DrawerCloseTrigger = ({ ref, ...props }: DrawerCloseTriggerProps) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(drawer.getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

DrawerCloseTrigger.displayName = 'DrawerCloseTrigger'
