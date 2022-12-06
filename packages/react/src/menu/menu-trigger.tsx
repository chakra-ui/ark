import { Children, cloneElement, ReactElement } from 'react'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export type MenuTriggerProps = { children: ReactElement }

export const MenuTrigger = (props: MenuTriggerProps) => {
  const api = useMenuContext() as UseMenuReturn['api']

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, api?.triggerProps ?? {})
}
