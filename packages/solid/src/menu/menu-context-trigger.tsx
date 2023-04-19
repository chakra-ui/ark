import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useMenuContext } from './menu-context'

export type MenuContextTriggerProps = { children: JSX.Element }

export const MenuContextTrigger = (props: MenuContextTriggerProps) => {
  const menu = useMenuContext()

  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, menu?.()?.contextTriggerProps)
    }
  })

  return getChildren()
}
