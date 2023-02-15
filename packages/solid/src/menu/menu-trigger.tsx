import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useMenuContext } from './menu-context'

export type MenuTriggerProps = { children: JSX.Element }

export const MenuTrigger = (props: MenuTriggerProps) => {
  const menu = useMenuContext()
  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      const accessor = menu?.()?.triggerProps
      spread(children, accessor)
    }
  })

  return getChildren
}
