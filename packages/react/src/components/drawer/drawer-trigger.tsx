import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerTriggerBaseProps extends PolymorphicProps {}
export interface DrawerTriggerProps extends HTMLProps<'button'>, DrawerTriggerBaseProps {}

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>((props, ref) => {
  const drawer = useDrawerContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(
    {
      ...drawer.getTriggerProps(),
      'aria-controls': presence.unmounted ? undefined : drawer.getTriggerProps()['aria-controls'],
    },
    props,
  )

  return <ark.button {...mergedProps} ref={ref} />
})

DrawerTrigger.displayName = 'DrawerTrigger'
