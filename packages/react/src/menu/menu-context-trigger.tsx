import * as React from 'react'
import { Children, type ReactElement } from 'react'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export type MenuContextTriggerProps = { children: ReactElement }

export const MenuContextTrigger = (props: MenuContextTriggerProps) => {
  const api = useMenuContext() as UseMenuReturn['api']

  const onlyChild = Children.only(props.children)
  return React.cloneElement(onlyChild, api?.contextTriggerProps ?? {})
}
