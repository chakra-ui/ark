import { mergeProps } from '@zag-js/react'
import type { TriggerProps } from '@zag-js/drawer'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface DrawerTriggerProps extends Assign<HTMLProps<'button'>, DrawerTriggerBaseProps> {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>((props, ref) => {
  const [triggerProps, localProps] = splitTriggerProps(props, ['value'])
  const drawer = useDrawerContext()
  const presence = usePresenceContext()
  const triggerPropsRaw = drawer.getTriggerProps(triggerProps)
  const mergedProps = mergeProps(
    {
      ...triggerPropsRaw,
      'aria-controls': presence.unmounted ? undefined : triggerPropsRaw['aria-controls'],
    },
    localProps,
  )

  return <ark.button {...mergedProps} ref={ref} />
})

DrawerTrigger.displayName = 'DrawerTrigger'
