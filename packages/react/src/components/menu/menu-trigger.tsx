'use client'

import { mergeProps } from '@zag-js/react'
import type { TriggerProps } from '@zag-js/menu'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export interface MenuTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface MenuTriggerProps extends Assign<HTMLProps<'button'>, MenuTriggerBaseProps> {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const MenuTrigger = ({ ref, ...props }: MenuTriggerProps) => {
  const [triggerProps, localProps] = splitTriggerProps(props, ['value'])
  const menu = useMenuContext()
  const presence = usePresenceContext()
  const triggerPropsRaw = menu.getTriggerProps(triggerProps)
  const mergedProps = mergeProps(
    {
      ...triggerPropsRaw,
      'aria-controls': presence.unmounted ? undefined : triggerPropsRaw['aria-controls'],
    },
    localProps,
  )

  return <ark.button {...mergedProps} ref={ref} />
}

MenuTrigger.displayName = 'MenuTrigger'
