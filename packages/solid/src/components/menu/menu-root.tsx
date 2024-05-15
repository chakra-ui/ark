import { mergeProps } from '@zag-js/solid'
import { type JSX, createEffect } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import { type UseMenuProps, useMenu } from './use-menu'
import { MenuProvider, useMenuContext } from './use-menu-context'
import { MenuMachineProvider, useMenuMachineContext } from './use-menu-machine-context'
import { MenuTriggerItemProvider } from './use-menu-trigger-item-context'

export interface MenuRootProps extends UseMenuProps, UsePresenceProps {
  children?: JSX.Element
}

export const MenuRoot = (props: MenuRootProps) => {
  const [presenceProps, menuProps] = splitPresenceProps(props)
  const [useMenuProps, localProps] = createSplitProps<UseMenuProps>()(menuProps, [
    'anchorPoint',
    'aria-label',
    'closeOnSelect',
    'composite',
    'defaultOpen',
    'highlightedValue',
    'id',
    'ids',
    'loopFocus',
    'onEscapeKeyDown',
    'onFocusOutside',
    'onHighlightChange',
    'onInteractOutside',
    'onOpenChange',
    'onPointerDownOutside',
    'onSelect',
    'open',
    'positioning',
    'typeahead',
  ])

  const parentApi = useMenuContext()
  const parentMachine = useMenuMachineContext()
  const menu = useMenu(useMenuProps)
  const presenceApi = usePresence(mergeProps(presenceProps, () => ({ present: menu.api().open })))

  createEffect(() => {
    if (!parentMachine) return
    parentApi?.().setChild(menu.machine)
    menu.api().setParent(parentMachine)
  })

  const triggerItemContext = () => parentApi?.().getTriggerItemProps(menu.api())

  return (
    <MenuTriggerItemProvider value={triggerItemContext}>
      <MenuMachineProvider value={menu.machine}>
        <MenuProvider value={menu.api}>
          <PresenceProvider value={presenceApi}>{localProps.children}</PresenceProvider>
        </MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}
