import { useMenuContext } from './menu-context'
import * as React from 'react'
import { Children, isValidElement, ReactElement } from 'react'

export type MenuContextTriggerProps = { children: ReactElement }

export const MenuContextTrigger = (props: MenuContextTriggerProps) => {
  const { api } = useMenuContext()

  const onlyChild = Children.only(props.children)
  if (!isValidElement(onlyChild)) {
    return null
  }

  const clone = React.cloneElement(onlyChild, api.contextTriggerProps)

  return <>{clone}</>
}
