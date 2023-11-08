import { useCallback, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { runIfFn } from '../run-if-fn'
import { useEffectOnce } from '../use-effect-once'
import {
  MenuMachineProvider,
  MenuProvider,
  MenuTriggerItemProvider,
  useMenuContext,
  useMenuMachineContext,
} from './menu-context'
import { useMenu, type UseMenuProps, type UseMenuReturn } from './use-menu'

export interface MenuProps extends UseMenuProps, UsePresenceProps {
  children?: ReactNode | ((api: UseMenuReturn['api']) => ReactNode)
}

export const Menu = (props: MenuProps) => {
  const [presenceProps, menuProps] = splitPresenceProps(props)
  const [useMenuProps, localProps] = createSplitProps<UseMenuProps>()(menuProps, [
    'anchorPoint',
    'aria-label',
    'closeOnSelect',
    'dir',
    'getRootNode',
    'highlightedId',
    'id',
    'ids',
    'loop',
    'onFocusOutside',
    'onInteractOutside',
    'onOpenChange',
    'onPointerDownOutside',
    'onSelect',
    'onValueChange',
    'open',
    'positioning',
    'value',
  ])

  const parentApi = useMenuContext() as UseMenuReturn['api']
  const parentMachine = useMenuMachineContext() as UseMenuReturn['machine']
  const { api, machine } = useMenu(useMenuProps)
  const presenceApi = usePresence({ ...presenceProps, present: api.isOpen })
  const view = runIfFn(localProps.children, api)

  useEffectOnce(() => {
    if (!parentMachine) return
    parentApi.setChild(machine)
    api.setParent(parentMachine)
  })

  const getTriggerItemProps = useCallback(
    () => parentApi.getTriggerItemProps(api),
    [api, parentApi],
  )

  return (
    <MenuTriggerItemProvider value={getTriggerItemProps}>
      <MenuMachineProvider value={machine}>
        <MenuProvider value={api}>
          <PresenceProvider value={presenceApi}>{view}</PresenceProvider>
        </MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}
