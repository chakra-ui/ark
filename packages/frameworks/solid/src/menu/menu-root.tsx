import * as menu from '@zag-js/menu'
import { mergeProps, type PropTypes } from '@zag-js/solid'
import { createEffect, createMemo, type Accessor, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { runIfFn } from '../run-if-fn'
import {
  MenuMachineProvider,
  MenuProvider,
  MenuTriggerItemProvider,
  useMenuContext,
  useMenuMachineContext,
} from './menu-context'
import { useMenu, type UseMenuProps } from './use-menu'

export interface MenuRootProps extends UseMenuProps, UsePresenceProps {
  children?: JSX.Element | ((api: Accessor<menu.Api<PropTypes>>) => JSX.Element)
}

export const MenuRoot = (props: MenuRootProps) => {
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
    'onEscapeKeyDown',
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

  const triggerItemContext = createMemo(() => parentMenu?.().getTriggerItemProps(menu().api()))
  const machineContext = () => menu().machine
  const getChildren = () => runIfFn(localProps.children, menu().api)

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
