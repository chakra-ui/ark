import { ReactNode, useCallback, useEffect } from 'react'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useEffectOnce } from '../use-effect-once'
import {
  MenuMachineProvider,
  MenuProvider,
  MenuTriggerItemProvider,
  useMenuContext,
  useMenuMachineContext,
} from './menu-context'
import { useMenu, UseMenuProps, UseMenuReturn } from './use-menu'

export type MenuState = {
  isOpen: boolean
  onClose: () => void
}

export type MenuProps = Assign<
  UseMenuProps,
  {
    children?: ReactNode | ((state: MenuState) => ReactNode)
    isOpen?: boolean
  }
>

export const Menu = (props: MenuProps) => {
  const [menuProps, { children, isOpen }] = createSplitProps<UseMenuProps>()(props, [
    'activeId',
    'anchorPoint',
    'aria-label',
    'closeOnSelect',
    'dir',
    'getRootNode',
    'id',
    'ids',
    'loop',
    'onSelect',
    'onValueChange',
    'positioning',
    'value',
  ])

  const parentApi = useMenuContext() as UseMenuReturn['api']
  const parentMachine = useMenuMachineContext() as UseMenuReturn['machine']

  const { api, machine } = useMenu(menuProps)

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
        <MenuProvider value={api}>{view}</MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}
