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
  const [presenceProps, menuProps] = splitPresenceProps(props)
  const presenceApi = usePresence(
    mergeProps(presenceProps, () => ({ present: menuProps.value.api().open })),
  )

  createEffect(() => {
    if (!parentMachine) return
    parentApi?.().setChild(menuProps.value.machine)
    menuProps.value.api().setParent(parentMachine)
  })

  const triggerItemContext = () => parentApi?.().getTriggerItemProps(menuProps.value.api())

  return (
    <MenuTriggerItemProvider value={triggerItemContext}>
      <MenuMachineProvider value={menuProps.value.machine}>
        <MenuProvider value={menuProps.value.api}>
          <PresenceProvider value={presenceApi}>{menuProps.children}</PresenceProvider>
        </MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}
