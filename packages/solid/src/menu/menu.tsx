import { createEffect, createMemo, type Accessor, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import {
  MenuMachineProvider,
  MenuProvider,
  MenuTriggerItemProvider,
  useMenuContext,
  useMenuMachineContext,
} from './menu-context'
import { useMenu, type UseMenuProps } from './use-menu'

export type MenuState = {
  isOpen?: boolean
  onClose?: () => void
}

export type MenuProps = Assign<
  UseMenuProps,
  {
    children?: JSX.Element | ((state: Accessor<MenuState>) => JSX.Element)
    isOpen?: Accessor<boolean>
  }
>

export const Menu = (props: MenuProps) => {
  const [menuParams, restProps] = createSplitProps<UseMenuProps>()(props, [
    'anchorPoint',
    'aria-label',
    'closeOnSelect',
    'dir',
    'getRootNode',
    'highlightedId',
    'id',
    'ids',
    'loop',
    'onClose',
    'onOpen',
    'onSelect',
    'onValueChange',
    'positioning',
    'value',
  ])

  const parentMenu = useMenuContext()
  const parentMachine = useMenuMachineContext()

  const menu = useMenu(menuParams)

  createEffect(() => {
    if (!parentMachine) return
    parentMenu?.().setChild(menu().machine)
    menu().api().setParent(parentMachine())
  })

  createEffect(() => {
    if (!restProps.isOpen) return
    restProps.isOpen?.() ? menu().api().open() : menu().api().close()
  })

  const triggerItemContext = createMemo(() => parentMenu?.().getTriggerItemProps(menu().api()))
  const machineContext = () => menu().machine

  const getChildren = () =>
    runIfFn(restProps.children, () => ({
      isOpen: menu?.().api().isOpen,
      onClose: menu?.().api().close,
    }))

  return (
    <MenuTriggerItemProvider value={triggerItemContext}>
      <MenuMachineProvider value={machineContext}>
        <MenuProvider value={menu().api}>{getChildren()}</MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}
