import { children, createEffect, JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export type MenuContextTriggerProps = { children: JSX.Element }

export const MenuContextTrigger = (props: MenuContextTriggerProps) => {
  const api = useMenuContext() as () => ReturnType<UseMenuReturn>['api']

  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, api()?.contextTriggerProps)
    }
  })

  return <>{getChildren()}</>
}
