import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export type MenuTriggerBaseProps = {}
export interface MenuTriggerProps extends HTMLArkProps<'button'>, MenuTriggerBaseProps {}

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>((props, ref) => {
  const menu = useMenuContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(
    {
      ...menu.getTriggerProps(),
      'aria-controls': presence.unmounted ? undefined : menu.getTriggerProps()['aria-controls'],
    },
    props,
  )

  return <ark.button {...mergedProps} ref={ref} />
})

MenuTrigger.displayName = 'MenuTrigger'
