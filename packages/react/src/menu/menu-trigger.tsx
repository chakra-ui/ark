import { Children, cloneElement, isValidElement, ReactElement } from 'react'
import { useMenuContext } from './menu-context'

export type MenuTriggerProps = { children: ReactElement | string | number }

export const MenuTrigger = (props: MenuTriggerProps) => {
  const { api } = useMenuContext()

  const onlyChild = Children.only(props.children)
  return isValidElement(onlyChild) ? (
    cloneElement(onlyChild, api.triggerProps)
  ) : (
    <button>{onlyChild}</button>
  )
}
