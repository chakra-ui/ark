import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export interface MenuTriggerBaseProps extends PolymorphicProps {}
export interface MenuTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    MenuTriggerBaseProps {}

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
