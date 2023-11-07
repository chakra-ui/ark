import { useCallback, useEffect, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { useEffectOnce } from '../use-effect-once'
import {
  MenuMachineProvider,
  MenuProvider,
  MenuTriggerItemProvider,
  useMenuContext,
  useMenuMachineContext,
} from './menu-context'
import { useMenu, type UseMenuProps, type UseMenuReturn } from './use-menu'

interface MenuState {
  isOpen: boolean
  onClose: () => void
}

export interface MenuProps
  extends Assign<
      UseMenuProps,
      {
        children?: ReactNode | ((state: MenuState) => ReactNode)
        isOpen?: boolean
      }
    >,
    UsePresenceProps {}

export const Menu = (props: MenuProps) => {
  const [presenceProps, menuProps] = splitPresenceProps(props)
  const [useMenuProps, { children, isOpen }] = createSplitProps<UseMenuProps>()(menuProps, [
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
    'positioning',
    'value',
  ])

  const parentApi = useMenuContext() as UseMenuReturn['api']
  const parentMachine = useMenuMachineContext() as UseMenuReturn['machine']

  const { api, machine } = useMenu(useMenuProps)
  const presenceApi = usePresence({ ...presenceProps, present: api.isOpen })
  const view = runIfFn<ReactNode, MenuState>(children, {
    isOpen: api.isOpen,
    onClose: api.close,
  })

  useEffectOnce(() => {
    if (!parentMachine) return
    parentApi.setChild(machine)
    api.setParent(parentMachine)
  })

  useEffect(() => {
    if (isOpen && !api.isOpen) {
      api.open()
    }
  }, [isOpen, api])

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
