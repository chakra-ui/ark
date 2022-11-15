import { ReactNode, useCallback, useEffect } from 'react'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useLatestRef } from '../use-latest-ref'
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
  { children: ReactNode },
  UseMenuProps & {
    children?: ReactNode | ((state: MenuState) => ReactNode)
  }
>

export const Menu = (props: MenuProps) => {
  const [menuProps, { children }] = createSplitProps<UseMenuProps>()(props, [
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

  const parentMachineRef = useLatestRef(parentMachine)
  const parentApiRef = useLatestRef(parentApi)
  const machineRef = useLatestRef(machine)
  const apiRef = useLatestRef(api)

  useEffect(() => {
    if (!parentMachineRef.current) return
    parentApiRef.current?.setChild(machineRef.current)
    apiRef.current?.setParent(parentMachineRef.current)
  }, [parentMachineRef, parentApiRef, machineRef, apiRef])

  const getTriggerItemProps = useCallback(
    () => parentApiRef.current?.getTriggerItemProps(apiRef.current),
    [apiRef, parentApiRef],
  )

  return (
    <MenuTriggerItemProvider value={getTriggerItemProps}>
      <MenuMachineProvider value={machine}>
        <MenuProvider value={api}>{view}</MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}
