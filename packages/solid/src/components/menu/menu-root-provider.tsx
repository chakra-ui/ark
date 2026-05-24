import { mergeProps } from '@zag-js/solid'
import { type JSX, createEffect } from 'solid-js'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence/index.tsx'
import type { UseMenuReturn } from './use-menu.ts'
import { MenuProvider, useMenuContext } from './use-menu-context.ts'
import { MenuMachineProvider, useMenuMachineContext } from './use-menu-machine-context.ts'
import { MenuTriggerItemProvider } from './use-menu-trigger-item-context.ts'

interface RootProviderProps {
  value: UseMenuReturn
}

export interface MenuRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
export interface MenuRootProviderProps extends MenuRootProviderBaseProps {
  children?: JSX.Element
}

export const MenuRootProvider = (props: MenuRootProviderProps) => {
  const parentApi = useMenuContext()
  const parentMachine = useMenuMachineContext()
  const [presenceProps, menuProps] = splitPresenceProps(props)
  const presenceApi = usePresence(mergeProps(presenceProps, () => ({ present: menuProps.value.api().open })))

  createEffect(() => {
    if (!parentMachine) return
    parentApi?.().setChild(menuProps.value.service)
    menuProps.value.api().setParent(parentMachine)
  })

  const triggerItemContext = () => parentApi?.().getTriggerItemProps(menuProps.value.api())

  return (
    <MenuTriggerItemProvider value={triggerItemContext}>
      <MenuMachineProvider value={menuProps.value.service}>
        <MenuProvider value={menuProps.value.api}>
          <PresenceProvider value={presenceApi}>{menuProps.children}</PresenceProvider>
        </MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}
