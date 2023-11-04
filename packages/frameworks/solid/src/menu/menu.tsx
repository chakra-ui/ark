import { mergeProps } from '@zag-js/solid'
import { createEffect, createMemo, type Accessor, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { PresenceProvider, splitPresenceProps, usePresence } from '../presence'
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
    'positioning',
    'value',
  ])

  const parentMenu = useMenuContext()
  const parentMachine = useMenuMachineContext()
  const menu = useMenu(useMenuProps)
  const apiPresence = usePresence(
    mergeProps(presenceProps, () => ({ present: menu().api().isOpen })),
  )

  createEffect(() => {
    if (!parentMachine) return
    parentMenu?.().setChild(menu().machine)
    menu().api().setParent(parentMachine())
  })

  createEffect(() => {
    if (!localProps.isOpen) return
    localProps.isOpen?.() ? menu().api().open() : menu().api().close()
  })

  const triggerItemContext = createMemo(() => parentMenu?.().getTriggerItemProps(menu().api()))
  const machineContext = () => menu().machine

  const getChildren = () =>
    runIfFn(localProps.children, () => ({
      isOpen: menu?.().api().isOpen,
      onClose: menu?.().api().close,
    }))

  return (
    <MenuTriggerItemProvider value={triggerItemContext}>
      <MenuMachineProvider value={machineContext}>
        <MenuProvider value={menu().api}>
          <PresenceProvider value={apiPresence}>{getChildren()}</PresenceProvider>
        </MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}
