import { useMenuContext } from './menu-context'
import * as React from 'react'
import { Children, isValidElement, ReactElement } from 'react'

export type MenuTriggerProps = { children: ReactElement }

export const MenuTrigger = (props: MenuTriggerProps) => {
  const { api } = useMenuContext()

  const onlyChild = Children.only(props.children)
  if (!isValidElement(onlyChild)) {
    return null
  }

  const clone = React.cloneElement(onlyChild, api.triggerProps)

  return <>{clone}</>
}
