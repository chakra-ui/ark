import { mergeProps } from '@zag-js/react'
import { type ReactNode, useCallback } from 'react'
import { useEffectOnce } from '../../utils/use-effect-once'
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
  children?: ReactNode
  value: UseMenuReturn
}

export interface MenuRootProviderProps extends RootProviderProps, UsePresenceProps {}

export const MenuRootProvider = (props: MenuRootProviderProps) => {
  const parentApi = useMenuContext()
  const parentMachine = useMenuMachineContext()
  const [presenceProps, { value: menu, children }] = splitPresenceProps(props)
  const { api, machine } = menu
  const presence = usePresence(mergeProps({ present: api.open }, presenceProps))

  useEffectOnce(() => {
    if (!parentMachine) return
    if (!parentApi) return

    parentApi.setChild(machine)
    api.setParent(parentMachine)
  })

  const triggerItemContext = useCallback(
    () => parentApi?.getTriggerItemProps(api),
    [api, parentApi],
  )

  return (
    <MenuTriggerItemProvider value={triggerItemContext}>
      <MenuMachineProvider value={machine}>
        <MenuProvider value={api}>
          <PresenceProvider value={presence}>{children}</PresenceProvider>
        </MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}
