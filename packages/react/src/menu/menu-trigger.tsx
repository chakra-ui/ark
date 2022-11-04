import { Children, cloneElement, ReactElement } from 'react'
import { useMenuContext } from './menu-context'

export type MenuTriggerProps = { children: ReactElement }

export const MenuTrigger = (props: MenuTriggerProps) => {
  const { api } = useMenuContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, api.triggerProps)
}
