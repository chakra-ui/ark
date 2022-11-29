import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export type MenuTriggerProps = { children: JSX.Element }

export const MenuTrigger = (props: MenuTriggerProps) => {
  const api = useMenuContext() as () => ReturnType<UseMenuReturn>['api']
  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, api?.()?.triggerProps)
    }
  })

  return <>{getChildren()}</>
}
