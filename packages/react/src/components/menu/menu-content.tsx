import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useMenuContext } from './use-menu-context'

export interface MenuContentBaseProps extends PolymorphicProps {}
export interface MenuContentProps extends HTMLAttributes<HTMLDivElement>, MenuContentBaseProps {}

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>((props, ref) => {
  const menu = useMenuContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(menu.getContentProps(), presence.getPresenceProps(ref), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

MenuContent.displayName = 'MenuContent'
