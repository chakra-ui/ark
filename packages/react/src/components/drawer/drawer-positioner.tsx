import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerPositionerBaseProps extends PolymorphicProps {}
export interface DrawerPositionerProps extends HTMLProps<'div'>, DrawerPositionerBaseProps {}

export const DrawerPositioner = forwardRef<HTMLDivElement, DrawerPositionerProps>((props, ref) => {
  const drawer = useDrawerContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(drawer.getPositionerProps(), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
})

DrawerPositioner.displayName = 'DrawerPositioner'
