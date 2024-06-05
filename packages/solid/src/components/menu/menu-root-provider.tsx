import { mergeProps } from '@zag-js/solid'
import { type JSX, createEffect } from 'solid-js'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import type { UseMenuReturn } from './use-menu'
import { MenuProvider, useMenuContext } from './use-menu-context'
import { MenuMachineProvider, useMenuMachineContext } from './use-menu-machine-context'
import { MenuTriggerItemProvider } from './use-menu-trigger-item-context'

interface RootProviderProps {
  children?: JSX.Element
  value: UseMenuReturn
}

export interface MenuRootProviderProps extends RootProviderProps, UsePresenceProps {}

export const MenuRootProvider = (props: MenuRootProviderProps) => {
  const parentApi = useMenuContext()
  const parentMachine = useMenuMachineContext()
  const [presenceProps, { value: menu, children }] = splitPresenceProps(props)
  const presenceApi = usePresence(mergeProps(presenceProps, () => ({ present: menu.api().open })))

  createEffect(() => {
    if (!parentMachine) return
    parentApi?.().setChild(menu.machine)
    menu.api().setParent(parentMachine)
  })

  const triggerItemContext = () => parentApi?.().getTriggerItemProps(menu.api())

  return (
    <MenuTriggerItemProvider value={triggerItemContext}>
      <MenuMachineProvider value={menu.machine}>
        <MenuProvider value={menu.api}>
          <PresenceProvider value={presenceApi}>{children}</PresenceProvider>
        </MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}
